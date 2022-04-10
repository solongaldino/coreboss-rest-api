import { JwtBlackListRepository, UserRepository } from "../../repositories";
import { ApiError, UID } from "../../utils";
import ILogoutUseCaseDTO from "./ILogoutUseCaseDTO";

class LogoutUseCase {
  constructor(
    private userRepository: UserRepository,
    private jwtBlackListRepository: JwtBlackListRepository,
    private uid: UID
  ) {}

  async run(data: ILogoutUseCaseDTO) {
    const { userId, xAccessToken } = data;

    const user = await this.userRepository.findById(userId);

    if (!user) throw new ApiError(400, "User not found");

    const response = await this.jwtBlackListRepository.create({
      data: {
        id: this.uid.create(),
        user: user.id,
        token: xAccessToken,
        created_at: new Date(),
      },
    });

    if (!response) throw new ApiError(400, "Logout fail");
  }
}
export default LogoutUseCase;
