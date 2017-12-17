
interface ServiceFacade {
  forgetPassword: (username: string) => Promise<void>;
  resetPassword: (token: string) => Promise<void>;
}

interface ServiceConfig {
  repo: RepositoryFacade;
}

// service/forgetPassword/Signature.ts
interface ForgetPasswordOpts {
  username: string;
}
type ForgetPasswordResult = void;
type ForgetPasswordSignature = (opts: ForgetPasswordOpts) => Promise<ForgetPasswordResult>;

// service/forgetPassword/index.ts
const forgetPassword = ({repo}: ServiceConfig): ForgetPasswordSignature => {
  return (username: string): Promise<void> => {
    const user = await repo.getUserByUsername(username);
    const token = await repo.createResetPasswordToken(user.id);
    const recipient = user.email;
    const subject = 'Password reset';
    const body = createPasswordResetEmailBody(token);
    await repo.sendEmail(recipient, s§ubject, body);
  };
};

const resetPassword = ({repo}: ServiceConfig) => {
  return (token: string, oldPassword, newPassword): Promise<void> => {

    const user = await repo.findUserByToken(token);
    await resetPasswordForUser(user, oldPassword, newPassword);

    const recipient = user.email;
    const subject = 'Your have reset your password';
    const body = 'You have reset your password. If you did\'t do it contact has immedietly';
    await repo.sendEmail(recipient, s§ubject, body);
  };
};

const serviceFactory = (config: ServiceConfig): ServiceFacade => {
  return {
    forgetPassword: forgetPassword(config),
    resetPassword: resetPassword(config)
  };
};

interface RepositoryFacade {
  getUserByUsername: (username: string) => Promise<User>;
  createResetPasswordToken: (userId: string) => Promise<string>;
  sendEmail: (recipient: string, subject: string, message: string) => Promise<void>;
}

const repoFactory = ({ db, hash, mail, ...otherConf }: Config): RepositoryFacade => {
  return {
    getUserByUsername: (db === 'mongo' ? getUserByUsernameMongo(...) : getUserByUsernameSql(...)),
    createResetPasswordToken: (hash === 'bcrypt' ? createResetPasswordToken() : fakeCreateResetPasswordToken()),
    sendEmail: (switch(mail){
      case: 'mailgun':
        return sendMailgunEmail();
      case: 'google':
        return sendGoogleEmail();
      default:
        return sendFakeEmail();
    })
  };
};

interface Config {
  db: string;
  hash: string;
  mail: string;
}

const config: Config = {
  db: 'mongo',
  hashService: 'bcrypt',
  email: 'mailgun'
};

const repo: RepositoryFacade = repoFactory(config);
const service: ServiceFacade = serviceFactory({repo});

interface PresenterConfig {
  service: ServiceFacade;
}

//HandleforgotPassword
const handleForgetPassword = ({service}: PresenterConfig) => {
  return catchErrors(async (req: Request, res: Response) => {
    //validation where?

    const username: string = req.body.username;
    await service.forgetPassword(username);

  });
};

//HandleforgotPassword
const resetPassword = ({service}: PresenterConfig) => {
  return catchErrors(async (req: Request, res: Response) => {
    //validation where?
    if(validotr.errors()){
      throw Invalid
    }
    const token: string = req.body.token;

    await service.resetPassword(token);

  });
};

const getTodos = ({service}: PresenterConfig) => {
  return catchErrors(async (req: Request, res: Response) => {
    
    const JWT_TOKEN = req.headers['token'];

    await validateToken(JWT_TOKEN);

    const token: string = req.body.token;

    await service.resetPassword(token);

  });
};

///PRESENTER FACADE
const presenterConfig = { service };
app.get('/api/v1/forgot-password', validateForgotPassword, handleForgetPassword(presenterConfig));
app.get('/api/v1/reset-password', resetPassword(presenterConfig));
app.get('/api/v1/todos', requireAuth, getTodos(presenterConfig));