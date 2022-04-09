import { UserRepository } from "../../repositories";
import { ApiError } from "../../utils";
import IIRegisteredEmailUseCaseDTO from "./IIsRegisteredEmailUseCaseDTO";

class IsRegisteredEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async run(data: IIRegisteredEmailUseCaseDTO) {
    const user = await this.userRepository.findByEmail(data.email);
    if (!!!user) throw new ApiError(400, "Usuário não encontrado");
    return true;
  }
}
export default IsRegisteredEmailUseCase;
