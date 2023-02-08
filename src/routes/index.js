import express from 'express';
import * as actions from '../actions';

const router = express.Router();

// App
router.route('/get-machine-name').post(actions.getMachineName);
router.route('/get-commit-info').post(actions.getCommitInfo);

// Bots
router.route('/get-bots').post(actions.getBots);
router.route('/get-bot').post(actions.getBot);
router.route('/create-bot').post(actions.createBot);
router.route('/update-bot').post(actions.updateBot);
router.route('/delete-bot').post(actions.deleteBot);

// OpenAI
router.route('/prompt-openai').post(actions.promptOpenAI);

export default router;
