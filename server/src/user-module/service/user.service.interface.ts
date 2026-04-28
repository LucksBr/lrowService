import BaseCrudServiceInterface from 'src/core/service/base.crud.service.interface';
import User from '../model/user.entity';

export default interface UserServiceInterface extends BaseCrudServiceInterface<User> {}
