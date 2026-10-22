import type { SkillGroup } from './types.ts';

// Click-to-filter skill chips. A skill highlights every project in projects.ts
// whose `skills` array contains the exact same string.

export const skillGroups: SkillGroup[] = [
  {
    title: 'ML & statistics',
    tag: 'ml',
    skills: ['scikit-learn', 'XGBoost', 'SVM', 'Regression', 'Ensembles', 'Clustering', 'PCA', 'SciPy'],
  },
  {
    title: 'Deep learning',
    tag: 'dl',
    skills: ['PyTorch', 'TensorFlow', 'ANN / FNN', 'CNN'],
  },
  {
    title: 'Data & viz',
    tag: 'data',
    skills: ['SQL', 'pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
  },
  {
    title: 'Vision & audio',
    tag: 'cv',
    skills: ['OpenCV', 'dlib', 'Face & speaker embeddings', 'Resemblyzer', 'librosa', 'MediaPipe'],
  },
  {
    title: 'LLMs & APIs',
    tag: 'llm',
    skills: ['RAG', 'LangChain', 'ChromaDB', 'Hugging Face', 'Groq & OpenAI APIs', 'REST APIs', 'Tavily', 'RDAP'],
  },
  {
    title: 'Tools & infra',
    tag: 'ops',
    skills: ['Python', 'Flask', 'Streamlit', 'Git', 'Docker', 'Render', 'Jupyter'],
  },
];
