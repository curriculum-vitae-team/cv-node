import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { UserRole } from "src/graphql";

export type JwtPayload = {
  sub: string;
  email: string;
  role: UserRole;
};

export type JwtResult = {
  userId: string;
  email: string;
  role: UserRole;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  validate(payload: JwtPayload): JwtResult {
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
