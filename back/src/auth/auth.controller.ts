import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local/local-auth.guard'; // We'll create this guard to handle login
import { JwtAuthGuard } from './jwt/jwt-auth.guard'; // Used for protecting routes
import { Roles } from './role/role.decorator';
import { RolesGuard } from './role/role.guard';

@Controller('auth')
export class AuthController {
    jwtService: any;
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        // req.user is populated with the authenticated user object by the guard
        const user = req.user; // This is the user object returned by the LocalStrategy
        const payload = { idUser: user.idUser }; // Create JWT payload
        const access_token = await this.authService.signPayload(payload); // Sign the JWT token
        return {
            statusCode: 200,
            result: {
                access_token,
                userName: user.userName
            }
        };
    }

    @UseGuards(JwtAuthGuard)
    @Roles('Administrador')
    @Get('profile')
    async getProfile(@Request() req) { 
        return {idUser: req.user}; // Access to the user info after successful JWT validation
    }
}
