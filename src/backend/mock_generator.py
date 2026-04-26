import json
import os
import random
from collections import defaultdict
from datetime import datetime, timezone

class MockBuilder:
    def __init__(self, dataset_path, output_path):
        self.dataset_path = dataset_path
        self.output_path = output_path
        self.db = {
            "english": defaultdict(lambda: {"easy": [], "medium": [], "hard": []}),
            "reasoning": defaultdict(lambda: {"easy": [], "medium": [], "hard": []}),
            "general_knowledge": defaultdict(lambda: {"easy": [], "medium": [], "hard": []}),
            "computer": defaultdict(lambda: {"easy": [], "medium": [], "hard": []})
        }
        random.seed(42)

    def load_dataset(self):
        """Loads the entire 1,820 question dataset into memory."""
        print(f"Loading dataset from {self.dataset_path}...")
        folder_map = {
            "english": "English",
            "reasoning": "Reasoning",
            "general_knowledge": "GK",
            "computer": "Computer"
        }
        for subject in self.db.keys():
            subject_folder = os.path.join(self.dataset_path, folder_map[subject])
            if not os.path.exists(subject_folder):
                continue
                
            for filename in os.listdir(subject_folder):
                if not filename.endswith('.json'):
                    continue
                topic = filename.replace('.json', '')
                filepath = os.path.join(subject_folder, filename)
                
                with open(filepath, 'r', encoding='utf-8') as f:
                    questions = json.load(f)
                    
                grouped = {"easy": [], "medium": [], "hard": []}
                for q in questions:
                    diff = q.get('difficulty', 'medium').lower()
                    if diff not in grouped: diff = 'medium'
                    grouped[diff].append(q)
                
                self.db[subject][topic] = grouped
        print("Dataset successfully loaded.")

    def _pull_questions(self, subject, topic, total_needed):
        topic_data = self.db[subject][topic]
        easy_needed = round(total_needed * 0.6 + 0.01)
        hard_needed = int(total_needed * 0.1)
        med_needed = total_needed - easy_needed - hard_needed
        
        pulled = []
        for _ in range(easy_needed):
            if topic_data["easy"]: pulled.append(topic_data["easy"].pop(0))
        for _ in range(med_needed):
            if topic_data["medium"]: pulled.append(topic_data["medium"].pop(0))
        for _ in range(hard_needed):
            if topic_data["hard"]: pulled.append(topic_data["hard"].pop(0))
            
        while len(pulled) < total_needed:
            if topic_data["medium"]: pulled.append(topic_data["medium"].pop(0))
            elif topic_data["easy"]: pulled.append(topic_data["easy"].pop(0))
            elif topic_data["hard"]: pulled.append(topic_data["hard"].pop(0))
            else: break
            
        return pulled

    def _get_set_based_chunk(self, subject, topic, chunk_size):
        topic_data = self.db[subject][topic]
        all_q = topic_data["easy"] + topic_data["medium"] + topic_data["hard"]
        all_q.sort(key=lambda x: x["id"])
        
        if not all_q: return []
        chunk = all_q[:chunk_size]
        
        for q in chunk:
            diff = q["difficulty"].lower()
            if q in self.db[subject][topic][diff]:
                self.db[subject][topic][diff].remove(q)
                
        return chunk

    def _sort_by_difficulty(self, questions):
        difficulty_val = {"easy": 1, "medium": 2, "hard": 3}
        questions.sort(key=lambda x: difficulty_val.get(x["difficulty"].lower(), 2))
        return questions

    def build_full_mocks(self, num_mocks=15):
        import glob
        if not os.path.exists(self.output_path):
            os.makedirs(self.output_path)
        else:
            for f in glob.glob(os.path.join(self.output_path, "*.json")):
                os.remove(f)
                
        # Flatten database into flat lists per subject
        flat_db = {}
        for subject in self.db:
            all_qs = []
            for topic in self.db[subject]:
                for diff in ["easy", "medium", "hard"]:
                    all_qs.extend(self.db[subject][topic][diff])
            random.shuffle(all_qs)
            flat_db[subject] = all_qs

        subject_counts = {
            "english": 30,
            "reasoning": 30,
            "general_knowledge": 20,
            "computer": 20
        }

        for subject, count in subject_counts.items():
            if len(flat_db[subject]) < num_mocks * count:
                print(f"CRITICAL: Not enough questions for {subject}. Need {num_mocks * count}, have {len(flat_db[subject])}.")
            
        for mock_num in range(1, num_mocks + 1):
            mock_id = f"FULL-MOCK-{mock_num:02d}"
            print(f"Building {mock_id}...")
            sections = []
            
            for idx, (subject, count) in enumerate(subject_counts.items(), 1):
                # Pull 'count' questions randomly (already shuffled) without replacement
                qs = []
                for _ in range(count):
                    if flat_db[subject]:
                        qs.append(flat_db[subject].pop(0))
                
                # Sort questions by difficulty for a better test experience
                qs = self._sort_by_difficulty(qs)
                
                sections.append({
                    "section_id": f"S{idx}",
                    "subject": subject,
                    "total_questions": len(qs),
                    "total_marks": len(qs),
                    "questions": [q["id"] for q in qs]
                })

            # ---------------------------------------------------------
            # ASSEMBLE FULL MOCK OBJECT
            # ---------------------------------------------------------
            mock_obj = {
                "mock_id": mock_id,
                "mock_type": "full_mock",
                "mock_number": mock_num,
                "total_questions": sum(s["total_questions"] for s in sections),
                "total_marks": sum(s["total_marks"] for s in sections),
                "duration_seconds": 7200,
                "negative_marking": False,
                "marks_per_correct": 1,
                "marks_per_wrong": 0,
                "sections": sections,
                "status": "not_started",
                "created_at": datetime.now(timezone.utc).isoformat()
            }
            
            out_file = os.path.join(self.output_path, f"{mock_id}.json")
            with open(out_file, 'w', encoding='utf-8') as f:
                json.dump(mock_obj, f, indent=2)
                
        print(f"Generated {num_mocks} Full Mocks successfully in {self.output_path}.")
        
        # ---------------------------------------------------------
        # GENERATE 19TH MOCK TEST (Remaining English & Reasoning)
        # ---------------------------------------------------------
        mock_id = "FULL-MOCK-19"
        print(f"Building {mock_id}...")
        sections = []
        
        # English: all remaining
        qs_eng = self._sort_by_difficulty(flat_db["english"])
        if qs_eng:
            sections.append({
                "section_id": "S1",
                "subject": "english",
                "total_questions": len(qs_eng),
                "total_marks": len(qs_eng),
                "questions": [q["id"] for q in qs_eng]
            })

        # Reasoning: all remaining
        qs_rsn = self._sort_by_difficulty(flat_db["reasoning"])
        if qs_rsn:
            sections.append({
                "section_id": "S2",
                "subject": "reasoning",
                "total_questions": len(qs_rsn),
                "total_marks": len(qs_rsn),
                "questions": [q["id"] for q in qs_rsn]
            })
            
        mock_obj_19 = {
            "mock_id": mock_id,
            "mock_type": "full_mock",
            "mock_number": 19,
            "total_questions": sum(s["total_questions"] for s in sections),
            "total_marks": sum(s["total_marks"] for s in sections),
            "duration_seconds": 2400,
            "negative_marking": False,
            "marks_per_correct": 1,
            "marks_per_wrong": 0,
            "sections": sections,
            "status": "not_started",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
        
        out_file = os.path.join(self.output_path, f"{mock_id}.json")
        with open(out_file, 'w', encoding='utf-8') as f:
            json.dump(mock_obj_19, f, indent=2)
            
        print(f"Generated {mock_id} successfully.")

if __name__ == "__main__":
    dataset_path = "c:/Projects/Cet_engine/data set"
    output_path = "c:/Projects/Cet_engine/practice_pool/mocks/full_mocks"
    
    builder = MockBuilder(dataset_path, output_path)
    builder.load_dataset()
    builder.build_full_mocks(18)
