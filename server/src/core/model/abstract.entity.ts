import BaseEntity from "./base.entity";

export default abstract class AbstractEntity implements BaseEntity {
    
    abstract id: number;

}