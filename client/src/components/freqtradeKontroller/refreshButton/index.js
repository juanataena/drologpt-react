import CachedTwoToneIcon from '@mui/icons-material/CachedTwoTone';

export default function RefreshButton (props) {

    const reloadData = () =>{
        
        // Log Action
        console.log('Reloading data...');

        // Reloading data...
        props.reloadData();

    }

    const lastUpdate = props.lastUpdate;
    let lastUpdateFormatted = lastUpdate.trim().split('.')[0];
    lastUpdateFormatted = lastUpdateFormatted.split('T')[0] + ' at ' + lastUpdateFormatted.split('T')[1];

    return  <div className="last-update-box">
        {/* Show last update */}
        <span className="last-update-label">Last update: <b>{lastUpdateFormatted}</b></span>
        <button className="refresh-button has-text-grey is-transparentt has-text-dark" onClick={reloadData}  data-tip={'Reload Data'} data-place="left" data-html="true">
            <CachedTwoToneIcon />
        </button>
    </div>
}
