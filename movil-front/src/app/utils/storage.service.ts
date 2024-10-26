import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    constructor(private storage: Storage) {
        this.init();
    }

    async init() {
        // If using, define drivers here: await this.storage.defineDriver(/*...*/);
        const storage = await this.storage.create();
        this.storage = storage;
    }

    // Create and expose methods that users of this service can
    // call, for example:
    public set(key: string, value: any) {
        this.storage.set(key, value);
    }

    public async get(key: string) {
        const value = await this.storage.get(key);
        return value;
    }

    clear() {
        this.storage.clear();
    }
}
