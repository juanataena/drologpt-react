// import * as _C from '../constants';
import { default as PostRender } from './reactPostRender';

export { PostRender };


export function getMachineNameResponse(req, res, machineName) {
    if (machineName /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(machineName);
    } else {
        res.send('errormarchineName');
    }
}
export function getNodesTreeResponse(req, res, nodesTree) {
    if (nodesTree /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(nodesTree);
    } else {
        res.send('error nodesTree');
    }
}
export function getDockerContainersResponse(req, res, dockerContainers) {
    if (dockerContainers /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(dockerContainers);
    } else {
        res.send('error dockerContainers');
    }
}
export function getNodeConfigResponse(req, res, nodeConfig) {
    if (nodeConfig /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(nodeConfig);
    } else {
        res.send('error nodeConfig');
    }
}

export function getNodeStrategyResponse(req, res, nodeConfig) {
    if (nodeConfig /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(nodeConfig);
    } else {
        res.send('error nodeConfig');
    }
}

export function getNodeTradesResponse(req, res, nodeTrades) {

    if (nodeTrades /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(nodeTrades);
    } else {
        res.send('error nodeTrades');
    }
}


export function getNodeBalanceResponse(req, res, nodeBalances) {
    
    if (nodeBalances /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(nodeBalances);
    } else {
        res.send('error nodeBalances');
    }
}


export function getBalanceDataResponse(req, res, balanceData) {
    
    if (balanceData /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(balanceData);
    } else {
        res.send('error balanceData');
    }
}

export function getProfitDataResponse(req, res, profitData) {
    
    if (profitData /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(profitData);
    } else {
        res.send('error profitData');
    }
}

export function getConfigJsonResponse(req, res, configJson) {
    
    if (configJson /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(configJson);
    } else {
        res.send('error configJson');
    }
}
export function setJsonConfigResponse(req, res, configJsonResponse) {
    
    if (configJsonResponse /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(configJsonResponse);
    } else {
        res.send('error configJsonResponse');
    }
}
export function getCommitInfoResponse(req, res, commitInfo) {
    if (commitInfo /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(commitInfo);
    } else {
        res.send('error commit info');
    }
}
export function getLastUpdateResponse(req, res, lastUpdate) {
    if (lastUpdate /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(lastUpdate);
    } else {
        res.send('error last update');
    }
}

export function reloadDataResponse(req, res, reloadData) {
    if (reloadData /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(reloadData);
    } else {
        res.send('error reload data');
    }
}

export function executeFreqtradeCommandResponse(req, res, executeFreqtradeCommandData) {
    if (executeFreqtradeCommandData /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(executeFreqtradeCommandData);
    } else {
        res.send("error in 'execute freqtrade command'");
    }
}

export function getTableInfoResponse (res, data) {
    if (data /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send({data, status: 200});
    } else {
        res.send("error in 'read table data'");
    }
}

export function takeProfitSnapshotResponse(res, data) {
    if (data /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send({data, status: 200});
    } else {
        res.send("error taking the snapshot profit");
    }}
