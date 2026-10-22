import type { Project } from './types.ts';

// Your projects, in display order.
//
// To add measured results later, fill in `results`, e.g.
//   results: [{ label: 'Face ID accuracy', value: '96%', note: '40 group photos, 2 classes' }],
// The results block only appears when the array has items.
//
// To add a showcase video, set `video` to a YouTube or Loom URL.
//
// Screenshots live in public/projects/. Keep width/height equal to the file's real size.

const ML_REPO = 'https://github.com/arpan-ghosh-42/MACHINE-LEARNING';
const DL_REPO = 'https://github.com/arpan-ghosh-42/Deep-Learning';

export const projects: Project[] = [
  {
    id: 'nibblecontract',
    name: 'NibbleContract AI',
    subtitle: 'Contract & internship authenticity checker',
    summary:
      'Turns internship offers, rental and loan agreements into a plain-language risk report, with an explainable 0–100 fake-internship trust score.',
    description: [
      'Upload a PDF or paste text and get ranked red flags, deadlines, money terms and questions to ask before signing.',
      'The LLM only extracts evidence; fixed rules do the scoring. Quotes not found verbatim in the document are discarded, and RDAP domain-age plus SSRF-safe website checks add extra signals.',
    ],
    tech: ['Python', 'Flask', 'Groq LLM', 'OpenAI-compatible API', 'pypdf', 'RDAP'],
    skills: ['Python', 'Flask', 'Groq & OpenAI APIs', 'REST APIs', 'RDAP', 'Render', 'Git'],
    live: 'https://nibblecontract-ai.onrender.com',
    repos: [{ label: 'GitHub', url: 'https://github.com/arpan-ghosh-42/NibbleContract-AI' }],
    image: {
      src: '/projects/nibblecontract.webp',
      alt: 'NibbleContract AI home page: a sample internship offer flagged with four red flags and a trust score of 1 out of 100.',
      width: 1200,
      height: 675,
    },
    video: undefined, // e.g. 'https://www.loom.com/share/...'
    results: [],
    pipeline: [
      { label: 'Upload', detail: 'PDF or pasted text: offer letter, rental or loan agreement.' },
      { label: 'LLM extracts evidence', detail: 'The model pulls out clauses, money terms and deadlines. It does not score.' },
      { label: 'Rules score', detail: 'Fixed, explainable rules turn evidence into a 0–100 trust score.' },
      { label: 'Verify quotes', detail: 'Any quote not found verbatim in the document is thrown away.' },
      { label: 'Report', detail: 'Ranked red flags, deadlines, money terms and questions to ask.' },
    ],
  },
  {
    id: 'attendly',
    name: 'Attendly',
    subtitle: 'AI attendance with face & voice recognition',
    summary: 'Marks a whole class from one group photo, or from a single classroom voice recording.',
    description: [
      '128-d face embeddings plus an SVC classifier identify each student; a distance threshold rejects unknown faces.',
      'Voice roll-call matches each speaker in a classroom recording by embedding similarity. Teacher and student portals with secure logins and link-based enrollment.',
    ],
    tech: ['Python', 'Streamlit', 'dlib ResNet embeddings', 'scikit-learn SVC', 'Resemblyzer', 'librosa', 'SQL'],
    skills: [
      'Python', 'Streamlit', 'scikit-learn', 'SVM', 'dlib', 'Face & speaker embeddings',
      'Resemblyzer', 'librosa', 'SQL', 'NumPy', 'pandas', 'Render', 'Git',
    ],
    live: 'https://ai-attendance-ufui.onrender.com/',
    repos: [{ label: 'GitHub', url: 'https://github.com/arpan-ghosh-42/AI-Attendance-System' }],
    image: {
      src: '/projects/attendly.webp',
      alt: 'Attendly home screen with Student Portal and Teacher Portal options.',
      width: 1200,
      height: 675,
    },
    video: undefined, // e.g. 'https://www.loom.com/share/...'
    results: [],
    pipeline: [
      { label: 'Group photo', detail: 'One photo of the whole class.' },
      { label: 'Face detection', detail: 'Every face in the frame is located and cropped.' },
      { label: '128-d embedding', detail: 'A dlib ResNet maps each face to a 128-number vector.' },
      { label: 'SVC + threshold', detail: 'An SVC names each student; a distance threshold rejects strangers.' },
      { label: 'Attendance', detail: 'Present students are marked automatically.' },
    ],
  },
  {
    id: 'movexa',
    name: 'Movexa',
    subtitle: 'AI gym coach & live form tracker',
    summary:
      'Builds a personalised workout plan, then watches your form live through the camera, counting reps and correcting you as you move.',
    description: [
      'Plans gym or home workouts (sets, reps, calorie and protein targets) from body stats, goal and equipment, grounded by RAG over exercise-science guidance and adapted around injuries.',
      'The live coach streams the camera over WebRTC, measures joint angles with pose estimation, counts reps and gives on-screen and spoken cues when form breaks. Supports 54 exercises.',
    ],
    tech: ['Python', 'Streamlit', 'WebRTC', 'MediaPipe pose', 'RAG', 'LLM API', 'Docker'],
    skills: ['Python', 'Streamlit', 'MediaPipe', 'RAG', 'Docker', 'Render', 'Git'],
    live: 'https://ai-gym-coach-b5j7.onrender.com',
    repos: [{ label: 'GitHub', url: 'https://github.com/arpan-ghosh-42/ai-gym-coach' }],
    image: {
      src: '/projects/movexa.webp',
      alt: 'Movexa landing page: "Your plan. Your form. AI-coached." with a button to launch the app.',
      width: 1200,
      height: 675,
    },
    video: undefined, // e.g. 'https://www.loom.com/share/...'
    results: [],
    pipeline: [
      { label: 'Camera', detail: 'Your webcam or phone camera, in the browser.' },
      { label: 'WebRTC stream', detail: 'Frames stream live to the app.' },
      { label: 'Pose landmarks', detail: 'MediaPipe finds body keypoints in every frame.' },
      { label: 'Joint angles', detail: 'Angles at knees, hips, elbows and more are measured.' },
      { label: 'Reps + feedback', detail: 'Reps are counted; on-screen and spoken cues fire when form breaks.' },
    ],
  },
  {
    id: 'research',
    name: 'ML & Deep Learning Research',
    subtitle: 'Notebooks, experiments and mini projects',
    summary:
      'Supervised and unsupervised learning on real datasets, plus ANN / CNN models in PyTorch and TensorFlow and a RAG pipeline.',
    description: [
      'Machine learning: regression, SVM and ensembles through to clustering, PCA and anomaly detection, compared through visualization.',
      'Deep learning: ANN / FNN and CNN models in PyTorch and TensorFlow, plus a RAG pipeline with LangChain and ChromaDB.',
    ],
    tech: ['scikit-learn', 'XGBoost', 'PyTorch', 'TensorFlow / Keras', 'pandas', 'Matplotlib', 'Seaborn'],
    skills: [
      'scikit-learn', 'XGBoost', 'SVM', 'Regression', 'Ensembles', 'Clustering', 'PCA',
      'PyTorch', 'TensorFlow', 'ANN / FNN', 'CNN', 'pandas', 'NumPy', 'Matplotlib', 'Seaborn',
      'OpenCV', 'RAG', 'LangChain', 'ChromaDB', 'Groq & OpenAI APIs', 'Python', 'Jupyter', 'Git',
    ],
    repos: [
      { label: 'Machine Learning', url: ML_REPO },
      { label: 'Deep Learning', url: DL_REPO },
    ],
    image: {
      src: '/projects/research.webp',
      alt: 'Bar chart from the Machine Learning repo comparing held-out test accuracy across the classification notebooks.',
      width: 1200,
      height: 1014,
      caption: 'MACHINE-LEARNING / images / results_classification.png',
    },
    results: [],
    pipeline: [
      { label: 'Real dataset', detail: 'Tabular, image or text data from a real problem.' },
      { label: 'Explore & clean', detail: 'EDA with pandas, Matplotlib and Seaborn.' },
      { label: 'Model', detail: 'Classical ML, ANNs, CNNs or a RAG pipeline.' },
      { label: 'Compare', detail: 'Models are compared side by side through visualization.' },
      { label: 'Understand why', detail: 'Go deep until it is clear why a model works.' },
    ],
    minorProjects: [
      { label: 'CreditWise Loan Approval', url: `${ML_REPO}/tree/HEAD/supervised/projects/credit-wise-loan-approval` },
      { label: 'House Prices', url: `${ML_REPO}/blob/HEAD/supervised/01-linear-regression/house_price_prediction.ipynb` },
      { label: 'Insurance Charges', url: `${ML_REPO}/blob/HEAD/supervised/01-linear-regression/insurance_charges.ipynb` },
      { label: 'Employee Turnover', url: `${ML_REPO}/blob/HEAD/supervised/03-logistic-regression/employee_turnover_regularization.ipynb` },
      { label: 'Heart Disease', url: `${ML_REPO}/blob/HEAD/supervised/03-logistic-regression/logistic_regression_heart.ipynb` },
      { label: 'Titanic', url: `${ML_REPO}/blob/HEAD/supervised/07-decision-trees/decision_tree_classifier_titanic.ipynb` },
      { label: 'Shop Smart', url: `${ML_REPO}/blob/HEAD/supervised/07-decision-trees/shop_smart_purchase_prediction.ipynb` },
      { label: 'Thyroid Anomaly', url: `${ML_REPO}/blob/HEAD/unsupervised/05-anomaly-detection/isolation_forest_lof_thyroid.ipynb` },
      { label: 'Date Fruit', url: `${DL_REPO}/tree/HEAD/02_ann/classification` },
      { label: 'Power Plant', url: `${DL_REPO}/tree/HEAD/02_ann/regression` },
      { label: 'Handwritten Characters', url: `${DL_REPO}/tree/HEAD/projects/01_handwritten_character_recognition` },
      { label: 'ASL Sign Language', url: `${DL_REPO}/tree/HEAD/projects/02_asl_sign_language_recognition` },
    ],
  },
];

/** Shown under the "Live demos" strip. Edit or set to '' to hide. */
export const demoNote = 'Hosted on Render. If an app has been idle, the first load can take a little while to wake up.';
