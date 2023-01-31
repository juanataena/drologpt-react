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
export function getCommitInfoResponse(req, res, commitInfo) {
    if (commitInfo /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(commitInfo);
    } else {
        res.send('errorcommitInfo');
    }
}
export function promptOpenAIResponse(req, res, openAIResponse) {
    if (openAIResponse /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(openAIResponse);
    } else {
        res.send("error prompting openAI");
    }
}
