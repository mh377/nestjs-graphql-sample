import { Logger } from "@nestjs/common";
import { Args, Context, Query, Resolver } from "@nestjs/graphql";
import { User } from "../models/user.model";
import { AppService } from "../services/app.service";

@Resolver(User)
export class AppResolver {
    private readonly logger: Logger = new Logger(AppResolver.name);

    constructor(private readonly appService: AppService) {}

    @Query(() => User)
    async getUser(@Context('req') req, @Args('userId') userId: number){
        const headers = req.headers;
        
        this.logger.log(`Received a GraphQL request to retrieve a user with id ${userId}`);

        return this.appService.getUser(userId);
    }
}