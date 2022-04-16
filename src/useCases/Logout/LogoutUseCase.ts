import { JwtBlackListRepository, UserRepository } from "../../repositories";
import { ApiError, UID } from "../../utils";
import ILogoutUseCaseDTO from "./ILogoutUseCaseDTO";

class LogoutUseCase {
  async run(data: ILogoutUseCaseDTO) {
    const { userId, xAccessToken } = data;

    const user = await UserRepository.findById(userId);

    if (!user) throw new ApiError(400, "User not found");

    const response = await JwtBlackListRepository.create({
      data: {
        id: UID.create(),
        user: user.id,
        token: xAccessToken,
        created_at: new Date(),
      },
    });

    if (!response) throw new ApiError(400, "Logout fail");
  }
}
export default new LogoutUseCase();
