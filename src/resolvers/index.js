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
export function takeProfitSnapshotResponse(res, data) {
    if (data /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send({data, status: 200});
    } else {
        res.send("error taking the snapshot profit");
    }}

export function promptOpenAIResponse(req, res, openAIResponse) {
    if (openAIResponse /* ----> & body.result === 200 ??? <---- */) {
        // ;
        res.send(openAIResponse);
    } else {
        res.send("error prompting openAI");
    }
}
