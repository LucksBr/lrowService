import User from '../../model/user.entity';
import BaseCrudRepositoryInterface from 'src/core/repository/base.crud.repository.interface';

export default interface UserRepositoryInterface extends BaseCrudRepositoryInterface<User> {

    findByEmail(email: string): Promise<User | null>

}
