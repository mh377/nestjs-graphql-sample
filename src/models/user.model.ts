import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class User {
    @Field(() => Number, { description: 'user id'})
    id: number;
    @Field(() => String, { description: 'title e.g. mr, mrs, sir, madam'})
    title: string;
    @Field(() => String, { description: 'firstname'})
    firstname: string;
    @Field(() => String, { description: 'surname'})
    surname: string;
}

