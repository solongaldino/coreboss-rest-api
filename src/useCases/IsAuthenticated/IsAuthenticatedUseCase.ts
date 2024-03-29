import { injectable } from "tsyringe";
import IIsAuthenticatedUseCase from "./IIsAuthenticatedUseCase";
import IIsAuthenticatedUseCaseDTO from "./IIsAuthenticatedUseCaseDTO";

@injectable()
export default class IsAuthenticatedUseCase implements IIsAuthenticatedUseCase {
  async run(data: IIsAuthenticatedUseCaseDTO) {
    // return AuthJwtService.isAuthenticated(token);
  }

  //   public async isBlackList(token: string) {
  //     const result = await prisma.jwtBlackList.findFirst({
  //       where: {
  //         token: token,
  //       },
  //     });
  //     return !!result ? true : false;
  //   }
}
