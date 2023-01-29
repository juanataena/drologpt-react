import express from 'express';
import * as actions from '../actions';

const router = express.Router();

router.route('/get-machine-name').post(actions.getMachineName);
router.route('/get-node-config').post(actions.getNodeConfig);
router.route('/get-node-strategy').post(actions.getNodeStrategy);
router.route('/get-nodes-tree').post(actions.getNodesTree);
router.route('/get-last-update').post(actions.getLastUpdate);
router.route('/reload-data').post(actions.reloadData);
router.route('/get-node-balance').post(actions.getNodeBalance);
router.route('/get-node-trades').post(actions.getNodeTrades);
router.route('/get-balance-data').post(actions.getBalanceData);
router.route('/get-profit-data').post(actions.getProfitData);
router.route('/get-config-json').post(actions.getConfigJson);
router.route('/set-config-json').post(actions.setJsonConfig);
router.route('/get-commit-info').post(actions.getCommitInfo);
router.route('/execute-freqtrade-command').post(actions.executeFreqtradeCommand);
router.route('/get-table-info').post(actions.getTableInfo);
router.route('/take-profit-snapshot').post(actions.takeProfitSnapshot);


export default router;
