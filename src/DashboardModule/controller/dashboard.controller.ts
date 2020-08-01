import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Constants, NeedRole, RoleGuard } from '../../CommonsModule';
import { DashboardService } from '../service/dashboard.service';
import { UserStatusEnum } from '../enum/UserStatusEnum';
import { RoleEnum } from '../../SecurityModule/enum/role.enum';

@Controller(
  `${Constants.API_PREFIX}/${Constants.API_VERSION_1}/${Constants.DASHBOARD_ENDPOINT}`,
)
export class DashboardController {
  constructor(private service: DashboardService) {}

  @Get('/user/quantity')
  @UseGuards(RoleGuard)
  @NeedRole(RoleEnum.ADMIN)
  public async getUserQuantity(
    @Query('status') status?: UserStatusEnum,
  ): Promise<{ quantity: number }> {
    return { quantity: await this.service.getUserQuantity(status) };
  }
}
