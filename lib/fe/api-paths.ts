import { ChatResponse } from "lib/types/api/chat.response";
import { OrganizationResponse } from "lib/types/api/organization.response";
import { UserResponse } from "lib/types/api/user.response";
import { Id } from "lib/types/core/id";
import { OrderingParams, PaginationParams } from "lib/fe/api-params";
import { isEmpty } from "lib/core/string-utils";
import { OrgMembershipResponse } from "lib/types/api/org-membership.response";
import { DocumentResponse } from "lib/types/api/document.response";
import { DocumentCollectionResponse } from "lib/types/api/document-collection.response";
import { ChatMessageResponse } from "lib/types/api/chat-message.response";

export const userApiPath = (userId: Id<UserResponse>): string => {
  return `/api/users/${userId}`;
};

export const chatsApiPath = ({
  orgIdOrSlug,
  userId,
  ordering = {
    orderBy: "createdAt",
    order: "asc",
  },
  pagination = {
    page: 1,
    pageSize: 10,
  },
}: {
  orgIdOrSlug?: string;
  userId?: string;
  ordering?: OrderingParams;
  pagination?: PaginationParams;
}): string => {
  return (
    `/api/chats?orderBy=${ordering.orderBy}&order=${ordering.order}&page=${pagination.page}&pageSize=${pagination.pageSize}` +
    (!isEmpty(orgIdOrSlug)
      ? `&orgIdOrSlug=${encodeURIComponent(orgIdOrSlug!)}`
      : "") +
    (!isEmpty(userId) ? `&userId=${encodeURIComponent(userId!)}` : "")
  );
};

export const chatApiPath = (chatId: Id<ChatResponse>): string => {
  return `/api/chats/${chatId}`;
};

export const documentCollectionDocumentsApiPath = (
  documentCollectionId: Id<DocumentCollectionResponse>,
): string => {
  return `/api/document-collections/${documentCollectionId}/documents`;
};

export const documentCollectionDocumentApiPath = (
  documentCollectionId: Id<DocumentCollectionResponse>,
  documentId: Id<DocumentResponse>,
): string => {
  return `/api/document-collections/${documentCollectionId}/documents/${documentId}`;
};

export const documentCollectionDocumentIndexApiPath = (
  documentCollectionId: Id<DocumentCollectionResponse>,
  documentId: Id<DocumentResponse>,
): string => {
  return `/api/document-collections/${documentCollectionId}/documents/${documentId}/index`;
};

export const postChatMessagesApiPath = (chatId: Id<ChatResponse>): string => {
  return `/api/chats/${chatId}/messages`;
};

export const postChatMessagesGenerateApiPath = (
  chatId: Id<ChatResponse>,
): string => {
  return `/api/chats/${chatId}/messages/generate`;
};

export const getChatMessagesApiPath = ({
  chatId,
  ordering = {
    orderBy: "createdAt",
    order: "asc",
  },
  pagination = {
    page: 1,
    pageSize: 10,
  },
}: {
  chatId: Id<ChatResponse>;
  ordering?: OrderingParams;
  pagination?: PaginationParams;
}): string => {
  return `/api/chats/${chatId}/messages?orderBy=${ordering.orderBy}&order=${ordering.order}&page=${pagination.page}&pageSize=${pagination.pageSize}`;
};

export const chatTitleApiPath = (chatId: Id<ChatResponse>): string => {
  return `/api/chats/${chatId}/title`;
};

export const getChatMessageCitationsApiPath = ({
  chatId,
  chatMessageIds,
}: {
  chatId: Id<ChatResponse>;
  chatMessageIds: Id<ChatMessageResponse>[];
}): string => {
  return `/api/chats/${chatId}/messages/citations?chatMessageIds=${chatMessageIds.join(
    ",",
  )}`;
};

export const organizationsIdOrSlugApiPath = (orgIdOrSlug: string): string => {
  return `/api/organizations/${orgIdOrSlug}`;
};

export const organizationsIdOrSlugChatApiPath = (
  orgIdOrSlug: string,
): string => {
  return `/api/organizations/${orgIdOrSlug}/chats`;
};

export const organizationsIdOrSlugModelsApiPath = (
  orgIdOrSlug: string,
  modelName: string,
): string => {
  return `/api/organizations/${orgIdOrSlug}/models?name=${modelName}`;
};

export const modelsPullApiPath = (orgIdOrSlug: string): string => {
  return `/api/organizations/${orgIdOrSlug}/models/pull`;
};

export const organizationsIdOrSlugDocumentCollectionApiPath = (
  orgIdOrSlug: string,
): string => {
  return `/api/organizations/${orgIdOrSlug}/document-collections`;
};

export const getOrgMembershipsApiPath = (
  orgId: Id<OrganizationResponse>,
  // filters and ordering
  {
    nameOrEmailLike,
    userId,
    orderingParams = {
      orderBy: "createdAt",
      order: "asc",
    },
    paginationParams = {
      page: 1,
      pageSize: 10,
    },
  }: {
    nameOrEmailLike?: string;
    userId?: string;
    orderingParams?: OrderingParams;
    paginationParams?: PaginationParams;
  },
): string => {
  return (
    `/api/organizations/${orgId}/memberships?orderBy=${orderingParams.orderBy}&order=${orderingParams.order}&page=${paginationParams.page}&pageSize=${paginationParams.pageSize}` +
    (!isEmpty(nameOrEmailLike)
      ? `&nameOrEmailLike=${encodeURIComponent(nameOrEmailLike!)}`
      : "") +
    (!isEmpty(userId) ? `&userId=${encodeURIComponent(userId!)}` : "")
  );
};

export const postOrgMembershipsApiPath = (
  orgId: Id<OrganizationResponse>,
): string => {
  return `/api/organizations/${orgId}/memberships`;
};

export const orgMembershipApiPath = (
  membershipId: Id<OrgMembershipResponse>,
): string => {
  return `/api/org-memberships/${membershipId}`;
};

export const userPasswordApiPath = (userId: Id<UserResponse>): string => {
  return `/api/users/${userId}/password`;
};

export const userForcePasswordResetApiPath = (
  userId: Id<UserResponse>,
): string => {
  return `${userApiPath(userId)}/password/force-reset`;
};

export const instanceConfigApiPath = (): string => {
  return "/api/instance-config";
};

export const modelProvidersApiPath = (): string => {
  return `/api/model-providers`;
};
