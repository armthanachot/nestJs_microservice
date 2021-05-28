import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

enum Status {
    Revoke = 'Revoke',
    Working = 'Working',
    Stoped = 'Stoped',
    Traveling = 'Traveling'
}
enum surveyType {
    Moon = 'Moon',
    Planet = 'Planet',
    EarthOrbit = 'EarthOrbit'

}
@Entity()
export class SpaceShip {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    name: string
    @Column()
    shortName:string
    @Column()
    img:string
    @Column()
    value: number
    @Column()
    seat: number 
    @Column()
    since:  number
    @Column({
        type:'enum',
        enum:surveyType
    })
    surveyType: string
    @Column({
        type:"enum",
        enum:Status,
        default:Status.Traveling
    })
    status:Status
    @Column({
        type:'timestamp',
        default:null
    })
    startDate:Date
    @Column({
        type:'timestamp',
        default:null
    })
    endDate:Date
    @CreateDateColumn()
    createdAt: Date
    @UpdateDateColumn()
    updatedAt: Date
}