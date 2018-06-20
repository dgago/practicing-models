import { User } from "../account/models/User";
import { Menu } from "../app/models/Menu";
import { IResults } from "../common/db/IResults";
import { IStore } from "../common/db/IStore";
import { DomainService } from "../common/services/DomainService";

export class MenuService extends DomainService {
    private userStore: IStore<User, string>;
    private menuStore: IStore<Menu, string>;

    public async getMenu(username: string) : Promise<IResults<Menu>> {
        const user: User = await this.userStore.findOne(username);
        return this.menuStore.find({
            roles: user.roles,
            username: user.username,
        });
    }
}