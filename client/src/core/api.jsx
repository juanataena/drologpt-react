// available calls

export async function getMachineName(){
    // e.preventDefault();
    const response = await fetch('/get-machine-name', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(),
    });
    const body = await response.text();
    ;
    return body;
};
export async function getNodesTree(){
    // e.preventDefault();
    const response = await fetch('/get-nodes-tree', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(),
    });
    const body = await response.text();
    ;
    return body;
};
export async function getDockerContainers(){
    // e.preventDefault();
    const response = await fetch('/get-docker-containers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(),
    });
    const body = await response.text();
    ;
    return body;
};
export async function getBalanceData(){
    // e.preventDefault();
    const response = await fetch('/get-balance-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(),
    });
    const body = await response.text();
    ;
    return body;
};
export async function getProfitData(){
    // e.preventDefault();
    const response = await fetch('/get-profit-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(),
    });
    const body = await response.text();
    ;
    return body;
}
export async function getConfigJson(){
    // e.preventDefault();
    const response = await fetch('/get-config-json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
    });
    const body = await response.text();
    ;
    return body;
}
export async function setJsonConfig(newConfig){
    if (newConfig !== null && newConfig !== undefined && typeof newConfig === 'string') {
    // e.preventDefault();
    const response = await fetch('/set-config-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },
        body: JSON.stringify({config: newConfig}),
      });
      const body = await response.text();
      ;
      return body;
  
    }
}

export async function getCommitInfo(){
    // e.preventDefault();
    const response = await fetch('/get-commit-info', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(),
    });
    const body = await response.text();
    ;
    return body;
};

export async function getLastUpdate(){
    // e.preventDefault();
    const response = await fetch('/get-last-update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
    });
    const body = await response.text();
    ;
    return body;
}

export async function reloadData(){
    // e.preventDefault();
    const response = await fetch('/reload-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(),
    });
    const body = await response.text();
    ;
    return body;
}


export async function executeFreqtradeCommand(instanceName, command) {
    // e.preventDefault();
    const response = await fetch('/execute-freqtrade-command', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({instanceName, command}),
    });
    const body = await response.text();
    ;
    return body;
}


export async function getTableInfo(name, columns) {
    // e.preventDefault();
    const response = await fetch('/get-table-info', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, columns}),
    });
    const body = await response.text();
    ;
    return body;
}