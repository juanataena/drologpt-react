import express from 'express';
import * as actions from '../actions';

const router = express.Router();

router.route('/get-machine-name').post(actions.getMachineName);
router.route('/prompt-openai').post(actions.promptOpenAI);
router.route('/get-commit-info').post(actions.getCommitInfo);


export default router;
