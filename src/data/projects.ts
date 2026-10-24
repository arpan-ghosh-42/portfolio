import type { Project } from './types.ts';

// Your projects, in display order.
//
// Measured results go in `results`, e.g.
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
    subtitle: 'Internship & offer letter authenticity checker',
    summary:
      'Checks an internship before you apply and the offer before you sign, with an explainable 0–100 trust score and the evidence behind every point.',
    description: [
      'Paste a job post (or a link to it) before applying, or upload an offer letter (PDF or text) before signing. The report gives a risk level, warning and good signs with evidence, and questions to ask.',
      'AI models only find evidence; fixed Python rules turn it into the score. Every quote must exist in the document, and every web finding must link to a page a tool actually returned, or it is not counted. Three research agents check reputation, company and funding in parallel.',
    ],
    tech: ['Python', 'Flask', 'Groq LLM', 'Agno agents', 'Tavily search', 'Pydantic', 'pypdf', 'RDAP'],
    skills: ['Python', 'Flask', 'Groq & OpenAI APIs', 'REST APIs', 'Tavily', 'RDAP', 'Render', 'Git'],
    live: 'https://nibblecontract-ai.onrender.com',
    repos: [{ label: 'GitHub', url: 'https://github.com/arpan-ghosh-42/NibbleContract-AI' }],
    image: {
      src: '/projects/nibblecontract.webp',
      alt: 'NibbleContract AI home page: "Is that internship the real thing?" with a sample offer letter flagged as high risk, four red flags and a trust score of 0 out of 100.',
      width: 1200,
      height: 675,
    },
    video: undefined, // e.g. 'https://www.loom.com/share/...'
    results: [
      { label: 'Red flags caught', value: '90%', note: 'Tested on 30 real documents' },
      { label: 'Fake-offer detection', value: '93%', note: 'Accuracy, same 30 documents' },
    ],
    pipeline: [
      { label: 'Job post or offer letter', detail: 'Paste a post or a link, or upload an offer letter (PDF or text).' },
      { label: 'Post analyst', detail: 'An LLM finds warning and good signs with verbatim quotes, and the internship type.' },
      { label: 'Research agents', detail: 'Reputation, company and funding agents run in parallel with web search and domain lookups.' },
      { label: 'Grounding check', detail: 'Quotes must exist in the text; web findings must link to a page a tool returned.' },
      { label: 'Rules score + report', detail: 'Fixed rules give a 0–100 score and risk level, with the evidence and questions to ask.' },
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
    live: 'https://attendly-2v69.onrender.com/',
    repos: [{ label: 'GitHub', url: 'https://github.com/arpan-ghosh-42/AI-Attendance-System' }],
    image: {
      src: '/projects/attendly.webp',
      alt: 'Attendly landing page: "Say goodbye to roll calls", with a face-recognition illustration marking a student present.',
      width: 1200,
      height: 675,
    },
    video: undefined, // e.g. 'https://www.loom.com/share/...'
    results: [
      { label: 'Face-match accuracy', value: '95%', note: 'Across 25 students' },
      { label: 'False accepts', value: '2%' },
      { label: 'False rejects', value: '4%' },
    ],
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
    results: [
      { label: 'Rep-count accuracy', value: '95%' },
      { label: 'Time per frame', value: '~30 ms' },
    ],
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
