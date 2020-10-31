import cors from 'cors';

const whiteList = ['http://127.0.0.1:3000'];

const corsOptionsDelegate = (req, cb) => {
  let corsOptions;
  if (whiteList.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { Origin: true };
  } else {
    corsOptions = { Origin: false };
  }
  cb(null, corsOptions);
};

const corsWithOptions = cors(corsOptionsDelegate);

export { cors, corsWithOptions };
