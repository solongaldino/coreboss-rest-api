import { IJwtBlackListRepository, IUserRepository } from "@repositories/prisma";
import { ApiError, UID } from "@utils";
import { inject, injectable } from "tsyringe";
import ILogoutUseCase from "./ILogoutUseCase";
import ILogoutUseCaseDTO from "./ILogoutUseCaseDTO";

@injectable()
export default class LogoutUseCase implements ILogoutUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("JwtBlackListRepository")
    private jwtBlackListRepository: IJwtBlackListRepository
  ) {}

  async run(data: ILogoutUseCaseDTO) {
    const { userId, xAccessToken } = data;

    const user = await this.userRepository.findById(userId);

    if (!user) throw new ApiError(400, "User not found");

    const response = await this.jwtBlackListRepository.create({
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
