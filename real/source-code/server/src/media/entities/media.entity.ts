import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity('media')
export class Media {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column({
        type:'blob'
    }) // Use 'blob' for storing binary data
    content: Buffer;
    @Column()
    type: string;
    constructor(media: Partial<Media>) {
        Object.assign(this, media);
    }
}
