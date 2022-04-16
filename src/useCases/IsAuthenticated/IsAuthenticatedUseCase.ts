import { AuthJwt } from "../../utils";
import IIsAuthenticatedUseCaseDTO from "./IIsAuthenticatedUseCaseDTO";

class IsAuthenticatedUseCase {
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
export default new IsAuthenticatedUseCase();
