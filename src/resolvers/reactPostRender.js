const path = require('path');
const fs = require('fs');
const request = require('request');

export default (req, res/* , next*/) => {
    const logger = req.logger;
    if (process.env.NODE_ENV !== 'production') {
        // In development mode, we request a copy of the CRA webpack generated html
        // and inject the partner data into it
        request('http://localhost:5000/index.html', (err, response, body) => {
            let RenderedApp = body.replace('</body>',
                `<script>
                    window.__PRELOADED_STATE__ = ${JSON.parse(JSON.stringify(req.body.data))}
                </script>
                </body>`);
            res.send(RenderedApp);
        });
    } else {
        // point to the html file created by CRA's build tool
        const filePath = path.resolve(__dirname, 'client', 'index.html');

        fs.readFile(filePath, 'utf8', (err, htmlData) => {
            if (err) {
                logger.error(`Error ${err}`);
                return res.status(404).end();
            }

            let RenderedApp = htmlData.replace('</body>',
                `<script>
                    window.__PRELOADED_STATE__ = ${JSON.parse(JSON.stringify(req.body.data))}
                </script>
                </body>`);
            return res.send(RenderedApp);
        });
    }
};
