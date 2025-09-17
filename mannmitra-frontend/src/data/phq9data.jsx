export const phq9Questions = [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    "Trouble falling or staying asleep, or sleeping too much?",
    "Feeling tired or having little energy?",
    "Poor appetite or overeating?",
    "Feeling bad about yourself—or that you are a failure or have let yourself or your family down?",
    "Trouble concentrating on things, such as reading the newspaper or watching television?",
    "Moving or speaking so slowly that other people could have noticed? Or the opposite—being so fidgety or restless that you have been moving around a lot more than usual?",
    "Thoughts that you would be better off dead or of hurting yourself in some way?"
];

export const gad7Questions = [
    "Feeling nervous, anxious, or on edge?",
    "Not being able to stop or control worrying?",
    "Worrying too much about different things?",
    "Trouble relaxing?",
    "Being so restless that it’s hard to sit still?",
    "Becoming easily annoyed or irritable?",
    "Feeling afraid as if something awful might happen?"
];

export const phq9ScoringGuide = [
    { min: 0, max: 4, label: 'Minimal Depression' },
    { min: 5, max: 9, label: 'Mild Depression' },
    { min: 10, max: 14, label: 'Moderate Depression' },
    { min: 15, max: 19, label: 'Moderately Severe Depression' },
    { min: 20, max: 27, label: 'Severe Depression' }
];

export const gad7ScoringGuide = [
    { min: 0, max: 4, label: 'Minimal Anxiety' },
    { min: 5, max: 9, label: 'Mild Anxiety' },
    { min: 10, max: 14, label: 'Moderate Anxiety' },
    { min: 15, max: 21, label: 'Severe Anxiety' }
];