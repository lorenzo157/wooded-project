import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard'; // We'll create this guard to handle login
//import { JwtAuthGuard } from './jwt-auth.guard'; // Used for protecting routes

@Controller('auth')
export class AuthController {
    jwtService: any;
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        // req.user is populated with the authenticated user object by the guard
        const user = req.user; // This is the user object returned by the LocalStrategy
        const payload = { id: user.idUser }; // Create JWT payload
        const access_token = await this.authService.signPayload(payload); // Sign the JWT token
        return {
            access_token,
            name: user.userName, // Return just user name to the client
        };
    }

    //@UseGuards(JwtAuthGuard)
    @Post('profile')
    getProfile(@Request() req) {
        return req.user; // Access to the user info after successful JWT validation
    }
}
