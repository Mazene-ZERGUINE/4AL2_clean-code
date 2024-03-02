import { Router } from 'express';

export interface RouterConfiguration {
	router: Router;
	initRoutes(): void;
}
