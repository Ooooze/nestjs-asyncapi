import {
  ExternalDocumentationObject,
  SecuritySchemeObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import {
  AsyncApiDocument,
  AsyncSecuritySchemeObject,
  AsyncServerObject,
} from './interface';
export declare class AsyncApiDocumentBuilder {
  private readonly buildDocumentBase;
  private readonly document;
  setTitle(title: string): this;
  setDescription(description: string): this;
  setVersion(version: string): this;
  setTermsOfService(termsOfService: string): this;
  setContact(name: string, url: string, email: string): this;
  setLicense(name: string, url: string): this;
  addServer(name: string, server: AsyncServerObject): this;
  addServers(
    servers: {
      name: string;
      server: AsyncServerObject;
    }[],
  ): this;
  setExternalDoc(description: string, url: string): this;
  setDefaultContentType(contentType: string): this;
  addTag(
    name: string,
    description?: string,
    externalDocs?: ExternalDocumentationObject,
  ): this;
  addSecurity(name: string, options: AsyncSecuritySchemeObject): this;
  addBearerAuth(options?: SecuritySchemeObject, name?: string): this;
  addOAuth2(options?: SecuritySchemeObject, name?: string): this;
  addApiKey(options?: SecuritySchemeObject, name?: string): this;
  addBasicAuth(options?: SecuritySchemeObject, name?: string): this;
  addCookieAuth(
    cookieName?: string,
    options?: SecuritySchemeObject,
    securityName?: string,
  ): this;
  build(): Omit<AsyncApiDocument, 'components' | 'channels'>;
}
