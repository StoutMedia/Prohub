import { developmentPlan, trainingPlans, reports } from '../data/pisaData.js';

export function generateDevelopmentPlan(input = {}) {
  return {
    ...developmentPlan,
    playerOverview: `${input.name || 'This player'} is being evaluated for ${input.position || 'their primary position'} with strengths in ${input.strengths || 'competitive habits'} and growth areas around ${input.weaknesses || 'consistency under pressure'}.`,
  };
}

export function generateTrainingPlan(input = {}) {
  return {
    ...trainingPlans[0],
    theme: input.theme || trainingPlans[0].theme,
    objective: input.objective || trainingPlans[0].objective,
    completionStatus: 'AI draft',
  };
}

export function generateRecruitingEmail(type = 'first outreach', player = {}) {
  const subjectMap = {
    first: 'Intro and highlight video',
    follow: 'Following up on my recruiting profile',
    tournament: 'Upcoming tournament schedule',
    thanks: 'Thank you for connecting',
  };
  return {
    subject: `${player.name || 'Player'} - ${subjectMap[type] || 'Recruiting update'}`,
    body: `Coach, my name is ${player.name || 'the player'} and I am a ${player.graduationYear || '2027'} ${player.position || 'soccer player'}. I am interested in your program and wanted to share my profile, highlight video, academic information, and upcoming schedule. Thank you for your time.`
  };
}

export function generateMonthlyReport(player = {}) {
  return { ...reports[0], summary: `${player.name || 'The player'} made measurable monthly progress across technical habits, tactical decisions, and ownership behaviors.` };
}

export function generateParentReport(player = {}) {
  return { ...reports[1], summary: `${player.name || 'Your player'} is progressing well and has clear next actions for training, recovery, and recruiting readiness.` };
}
