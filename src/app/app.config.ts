import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routing.module';

// Define the application configuration
export const appConfig: ApplicationConfig = {
	providers: [provideRouter(routes)],
};