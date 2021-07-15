import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import jwt_decode from "jwt-decode";

@Injectable()
export class AdminAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest() as Request;

    const decoded = jwt_decode(req.cookies["adminToken"]);

    return (decoded as any).username === process.env.ADMIN_USERNAME;
  }
}
