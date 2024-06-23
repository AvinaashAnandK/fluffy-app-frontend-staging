// @/lib/mongodbcalls.ts
import { ApiLimits, Chat, PurchaseHistory, PurchaseHistoryUpdate, UpdatePurchaseRequest } from "./typesserver";

const dboperationsUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `${process.env.NEXT_PUBLIC_APP_URL}/api/dboperations`
  : "http://localhost:3000/api/dboperations";

export const checkChatLimits = async (userId: string, userEmail: string) => {
    const params = new URLSearchParams({
      userId,
      userEmail,
      repoLimit: "false",
    });
    try {
      const response = await fetch(
        `${dboperationsUrl}/apiLimits/checkLimit?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Failed in running chat limits check for user:", error);
      return null;
    }
  };

// Usage:   
// if (!userId) {
//     currentMessage.fluffyStatus.gateKeepingChecks = "failed";
//     currentMessage.fluffyStatus.gateKeepingStatus = "no_user_id";
//     currentMessage.fluffyStatus.fluffyStatusOverall = "failed";
//     streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
//   } else {
//     const limitCheck = await checkChatLimits(userId, userEmail);
//     if (limitCheck?.limitExceeded) {
//       currentMessage.fluffyStatus.gateKeepingChecks = "failed";
//       currentMessage.fluffyStatus.gateKeepingStatus = "limits_exceeded";
//       currentMessage.fluffyStatus.fluffyStatusOverall = "failed";
//       streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
//     } else if (!repoUrl) {
//       currentMessage.fluffyStatus.gateKeepingChecks = "failed";
//       currentMessage.fluffyStatus.gateKeepingStatus = "no_repo_url";
//       currentMessage.fluffyStatus.fluffyStatusOverall = "failed";
//       streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
//     } else {
//       currentMessage.fluffyStatus.gateKeepingChecks = "passed";
//       currentMessage.fluffyStatus.gateKeepingStatus = "success";
//       currentMessage.fluffyStatus.fluffyStatusOverall = "inprogress";
//       streamable.update({ fluffyStatus: currentMessage.fluffyStatus });
//     }
//   }

export const checkRepoLimits = async (userId: string, userEmail: string) => {
    const params = new URLSearchParams({
      userId,
      userEmail,
      repoLimit: "true",
    });
    try {
      const response = await fetch(
        `${dboperationsUrl}/apiLimits/checkLimit?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Failed in running repo limits check for user:", error);
      return null;
    }
  };

export const updateChatLimit = async (userId: string): Promise<any> => {
    const updateRepo = false;
  
    const params = new URLSearchParams({
      userId,
      updateRepo: updateRepo.toString(),
    });
  
    const updateUrl = `${dboperationsUrl}/apiLimits/updateLimit?${params.toString()}`;
  
    try {
      const response = await fetch(updateUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Failed to update limit:', error);
      return null;
    }
  };

export const updateRepoLimit = async (userId: string): Promise<any> => {
    const updateRepo = true;
  
    const params = new URLSearchParams({
      userId,
      updateRepo: updateRepo.toString(),
    });
  
    const updateUrl = `${dboperationsUrl}/apiLimits/updateLimit?${params.toString()}`;
  
    try {
      const response = await fetch(updateUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error('Failed to update limit:', error);
      return null;
    }
  };

export const createUserLimits = async (userInfo: ApiLimits) => {
    try {
      const response = await fetch(`${dboperationsUrl}/apiLimits/createLimit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Failed to create user limits:", error);
      return null;
    }
  };

export const fetchUserLimit = async (userId: string, userEmail: string | undefined) => {
    const params = new URLSearchParams({ userId, userEmail: userEmail || '' });
    try {
        const response = await fetch(`/api/dboperations/apiLimits/fetchLimit?${params.toString()}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Failed to fetch user limits:", error);
        return null;
    }
};

export const updateUserPurchase = async (data: UpdatePurchaseRequest) => {
    try {
      const response = await fetch(`${dboperationsUrl}/apiLimits/updatePurchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Failed to update user's purchase history:", error);
      return null;
    }
  };

export const saveChat = async (chatObject: Chat) => {
    const createUrl = `${dboperationsUrl}/chatHistory/createChat`;
    try {
      const response = await fetch(createUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatObject),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      const limitUpdateResult = await updateChatLimit(chatObject.userId);
      console.log("Limit update result:", limitUpdateResult);
      return result;
    } catch (error) {
      console.error("Failed to handle chat operation:", error);
      return null;
    }
  };

export const fetchChat = async (chatId: string, repoId: string): Promise<Chat | null> => {
    const uniqueId = `${chatId}-${repoId}`;
    const params = new URLSearchParams({ uniqueId });
    try {
      const response = await fetch(`${dboperationsUrl}/chatHistory/fetchChat?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result: Chat = await response.json();
      // Optionally, you can validate and format result here to ensure it matches the Chat interface
      return result;
    } catch (error) {
      console.log(`Failed to fetch chat: ${error} - Chat id: ${chatId} - Repo id: ${repoId}`);
      return null;
    }
  };

export const fetchChatHistory = async (userId: string) => {
    const params = new URLSearchParams({ userId });
    try {
      const response = await fetch(`${dboperationsUrl}/chatHistory/fetchUserChats?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Failed to fetch user chats:", error);
      return null;
    }
  };

export const createUserPreferences = async (
    userId: string,
    coderOptions: string,
    fluffyResponseOptions: string,
    languagesOptions: string[]
  ) => {
    try {
      const response = await fetch(`${dboperationsUrl}/userPreferences/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          coderOptions,
          fluffyResponseOptions,
          languagesOptions,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Failed to create user preferences:", error);
      return null;
    }
  };

export const fetchUserPreferences = async (userId: string) => {
    const params = new URLSearchParams({ userId });
    try {
      const response = await fetch(`${dboperationsUrl}/userPreferences/fetchUser?${params.toString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Failed to fetch user preferences:", error);
      return null;
    }
  };

export const fetchStripeCustomerId = async (userId: string, userEmail: string) => {
    const params = new URLSearchParams({
      userId,
      userEmail
    });
    try {
      const response = await fetch(
        `${dboperationsUrl}/purchaseHistory/fetchStripeCustomerId?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.stripeCustomerId;
    } catch (error) {
      console.error("Failed in fetching stripe customer id for user:", error);
      return null;
    }
  };

export const createStripeSubscription = async (purchaseObject: PurchaseHistory) => {
    const createUrl = `${dboperationsUrl}/purchaseHistory/createPurchase`;
    try {
      const response = await fetch(createUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseObject),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Failed to handle creating stripe subscription operation:", error);
      return null;
    }
  };

export const updateStripeSubscription = async (purchaseUpdateObject: PurchaseHistoryUpdate ) => {
    const createUrl = `${dboperationsUrl}/purchaseHistory/updatePurchase`;
    try {
      const response = await fetch(createUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseUpdateObject),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error! status: ${response.status}, body: ${errorText}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      
      return result;
    } catch (error) {
      console.error("Failed to handle update stripe subscription operation:", error);
      return null;
    }
  };

export const fetchCurrentSubscription = async (userId: string) => {
  const params = new URLSearchParams({
    userId
  });

  console.log("api endpoint", `${dboperationsUrl}/purchaseHistory/fetchCurrentSubscription?${params.toString()}`);
  try {
    const response = await fetch(`${dboperationsUrl}/purchaseHistory/fetchCurrentSubscription?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Failed in fetching stripe subscription for user");
    return null;
  }
};