export enum QuestionCategory {
    Career = 'career',
    Relationship = 'relationship',
    Wealth = 'wealth',
    Health = 'health',
    Study = 'study',
    Travel = 'travel',
    Legal = 'legal',
    Family = 'family',
    Investment = 'investment',
    JobChange = 'job_change',
    Marriage = 'marriage',
    General = 'general'
}

export const getQuestionCategoryLabel = (category: QuestionCategory): string => {
    const labels: Record<QuestionCategory, string> = {
        [QuestionCategory.Career]: '事业',
        [QuestionCategory.Relationship]: '感情',
        [QuestionCategory.Wealth]: '财运',
        [QuestionCategory.Health]: '健康',
        [QuestionCategory.Study]: '学业',
        [QuestionCategory.Travel]: '出行',
        [QuestionCategory.Legal]: '诉讼',
        [QuestionCategory.Family]: '家庭',
        [QuestionCategory.Investment]: '投资',
        [QuestionCategory.JobChange]: '求职',
        [QuestionCategory.Marriage]: '婚姻',
        [QuestionCategory.General]: '运势'
    };
    return labels[category];
};

export const getQuestionCategoryIcon = (category: QuestionCategory): string => {
    const icons: Record<QuestionCategory, string> = {
        [QuestionCategory.Career]: '💼',
        [QuestionCategory.Relationship]: '❤️',
        [QuestionCategory.Wealth]: '💰',
        [QuestionCategory.Health]: '🏥',
        [QuestionCategory.Study]: '📚',
        [QuestionCategory.Travel]: '✈️',
        [QuestionCategory.Legal]: '⚖️',
        [QuestionCategory.Family]: '🏠',
        [QuestionCategory.Investment]: '📈',
        [QuestionCategory.JobChange]: '💼',
        [QuestionCategory.Marriage]: '💍',
        [QuestionCategory.General]: '🌟'
    };
    return icons[category];
};

export const getDefaultQuestion = (category: QuestionCategory): string => {
    const questions: Record<QuestionCategory, string> = {
        [QuestionCategory.Career]: '今年事业发展如何？',
        [QuestionCategory.Relationship]: '今年感情运势如何？',
        [QuestionCategory.Wealth]: '今年财运如何？',
        [QuestionCategory.Health]: '今年身体健康状况如何？',
        [QuestionCategory.Study]: '今年学业考试能否顺利？',
        [QuestionCategory.Travel]: '此次出行是否顺利？',
        [QuestionCategory.Legal]: '此纠纷能否胜诉？',
        [QuestionCategory.Family]: '家庭关系是否和睦？',
        [QuestionCategory.Investment]: '此次投资是否可行？',
        [QuestionCategory.JobChange]: '换工作是否合适？',
        [QuestionCategory.Marriage]: '今年能否成婚？',
        [QuestionCategory.General]: '今年整体运势如何？'
    };
    return questions[category];
};

export const QUESTION_CATEGORIES: QuestionCategory[] = [
    QuestionCategory.Career,
    QuestionCategory.Relationship,
    QuestionCategory.Wealth,
    QuestionCategory.Health,
    QuestionCategory.Study,
    QuestionCategory.Family,
    QuestionCategory.Investment,
    QuestionCategory.JobChange,
    QuestionCategory.Marriage,
    QuestionCategory.Travel,
    QuestionCategory.Legal,
    QuestionCategory.General
];