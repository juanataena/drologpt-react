import AppName from 'components/layout/skeleton/navbar/appName';

export default function IsLoading (props) {
    return  <div className="section header-section is-bordered-1 has-text-grey">
        <div className="has-text-centered has-text-grey">
            <h1 className="title is-1 is-spaced">
                {true && <AppName version="1" />}
            </h1>
            <div className="is-hiddenn is-invisiblee">
                <h4 className="subtitle is-6 has-text-grey has-text-weight-light ">Loading...</h4>
                <div className="">
                <img className="loading-img" width="100" src="img/loading.gif" alt="Loading..." />
                </div>
                
            </div>
        </div>
    </div>
}
