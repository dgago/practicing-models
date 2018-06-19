import { DomainService } from "../common/services/DomainService";
import { IStore } from "../../domain/common/db/IStore";
import { User } from "../account/models/User";

export class MenuService extends DomainService {
    private userStore: IStore<User, string>;
    private menuStore: IStore<Menu, string>;

    async getMenu(username: string) : Promise<Menu> {
        let user: User = await this.userStore.findOne(username);
        return this.menuStore.find({
            username: user.username,
            roles: user.roles
        });
    }
}