import express,{Request,Response,NextFunction} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
const PORT = process.env.PORT||3333;

app.get('/', (req: Request, res: Response,next: NextFunction ) => {
  next();
  res.send('Hello World!');
});


app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});