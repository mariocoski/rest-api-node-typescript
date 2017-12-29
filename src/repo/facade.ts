import Config from './Config';
import Repo from './Repo';
import sequelizeRepo from './utils/sequelize/facade';
import nodemailerRepo from './utils/nodemailer/facade';
import {models, sequelize} from '../models'; 
import {ModelRepoInterface, MailRepoInterface} from './Repo';

const modelRepoFactory = (name: string): ModelRepoInterface => {
  switch (name) {
    default: case 'sequelize':
      return sequelizeRepo({
        sequelizeInstance: sequelize,
        models: models
      });
  }
}

const mailRepoFactory = (name: string):MailRepoInterface => {
  switch (name) {
    default: case 'nodemailer':
      return nodemailerRepo({});
  }
}

export default (config: Config): Repo => {
  /* istanbul ignore next */
  return {
    ...modelRepoFactory(config.modelRepoName),
    ...mailRepoFactory(config.mailRepoName)
  }
};