import { createReducer } from "@reduxjs/toolkit";

import { serializeError } from "serialize-error";
import {
  addNewConnection,
  allHeadConnection,
  allMentorConnection,
  allMentors,
  allSelfConnection,
  assignConnection,
  changePassword,
  clearError,
  clearMessage,
  deleteUser,
  findConnectionByMob,
  findMentorByMob,
  getAllAdmin,
  getAllChats,
  getAllChatsStu,
  getAllMentors,
  getAllNotification,
  getAllNotificationStu,
  getAllStudents,
  getNotesPhyysics,
  getUserDetails,
  getUserDetailsAdmin,
  getVisitsData,
  isTKid,
  loadUser,
  loginUser,
  logoutUser,
  otpReset,
  popUpState,
  resendOTP,
  reset,
  resetPassword,
  resolveConnection,
  sendOTP,
  signUpMentor,
  stuVerifyOTP,
  sturesendOTP,
  stusendOTP,
  stusendOTPemail,
  stusendOTPnumb,
  mentorSendOTPnumb,
  mentorSendOTPemail,
  swapConnection,
  updateCoverImage,
  updateMentorFinalInfo,
  updateMentorFinalInfoAfter,
  updateMentorInfo,
  updateMentoringStatus,
  updatePasswordMentor,
  updateRoleMentor,
  updateStatusHeadMentor,
  uploadNotes,
  verifyOTP,
} from "../action/userAction";

const initalState = {};

// export const cartItemReducer = createReducer(initalState, (builder) => {
//   builder

//     .addCase(addItemToCart.pending, (state, action) => {
//       return {
//         ...state,
//         loading: true,
//      te };
//     })
//     .addCase(addItemToCart.fulfilled, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         success: action.payload.success,
//       };
//     })
//     .addCase(addItemToCart.rejected, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     })

//   // get Cart Item
//     .addCase(getCartItem.pending, (state, action) => {
//       return {
//         ...state,
//         loading: true,
//       };
//     })
//     .addCase(getCartItem.fulfilled, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         cart: action.payload.cart,
//       };
//     })
//     .addCase(getCartItem.rejected, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     })
//     .addCase(reset.fulfilled, (state, action) => {
//       return {
//         ...state,
//         success: false,
//       };
//     })
//     .addCase(clearError.fulfilled, (state, action) => {
//       return {
//         ...state,
//         error: null,
//       };
//     });
// });

// export const updateRoleReducer = createReducer(initalState, (builder) => {
//   builder
//     .addCase(updateUser.pending, (state, action) => {
//       return {
//         ...state,
//         loading: true,
//       };
//     })
//     .addCase(updateUser.fulfilled, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         isUpdated: action.payload,
//       };
//     })
//     .addCase(updateUser.rejected, (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     })
//     .addCase(reset.fulfilled, (state, action) => {
//       return {
//         ...state,
//         isUpdated: false,
//       };
//     })
//     .addCase(clearError.fulfilled, (state, action) => {
//       return {
//         ...state,
//         error: null,
//       };
//     });
// });




export const uploadvideoLecturePhyNoteReducer=createReducer(initalState,(builder)=>{
  builder
      .addCase(uploadNotes.fulfilled, (state, action) => {
        state.notes[action.payload.videoId] = action.payload.note;
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.startsWith('videoNotes/upload') && action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith('videoNotes/upload') && action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
})


export const fetchvideoLecturePhyNoteReducer=createReducer(initalState,(builder)=>{
  builder
  .addCase(getNotesPhyysics.fulfilled, (state, action) => {
    action.payload.forEach(note => {
      state.notes[note.videoId] = note.note;
    });
    state.loading = false;
  })
  .addMatcher(
    (action) => action.type.startsWith('videoNotes/get') && action.type.endsWith('/pending'),
    (state) => {
      state.loading = true;
    }
  )
  .addMatcher(
    (action) => action.type.startsWith('videoNotes/get') && action.type.endsWith('/rejected'),
    (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  );
})


export const mentorSignup = createReducer(initalState, (builder) => {
  builder
    //Signup
    .addCase(signUpMentor.pending, (state, action) => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    })
    .addCase(signUpMentor.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: serializeError(action.payload),
      };
    })
    .addCase(signUpMentor.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: serializeError(action.payload),
      };
    })

    //Logout
    .addCase(logoutUser.pending, (state, action) => {
      return {
        loading: true,
      };
    })
    .addCase(logoutUser.fulfilled, (state, action) => {
      return {
        loading: false,
        message: action.payload.message,
        isAuthenticated: false,
      };
    })
    .addCase(logoutUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: serializeError(action.payload.message),
      };
    })
    //login
    .addCase(loginUser.pending, (state, action) => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    })
    .addCase(loginUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        loginMessage: "Logged In",
      };
    })
    .addCase(clearMessage.fulfilled, (state, action) => {
      return {
        ...state,
        loginMessage: null,
        message: null,
      };
    })
    .addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    })
    .addCase(loadUser.pending, (state, action) => {
      return {
        loading: true,
        isAuthenticated: false,
      };
    })
    .addCase(loadUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    })
    .addCase(loadUser.rejected, (state, action) => {
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: null,
      };
    })

    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

export const mentorDetailsReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(getUserDetails.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getUserDetails.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    })
    .addCase(getUserDetails.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const mentorDetailsReducerAdmin = createReducer(initalState, (builder) => {
  builder

    .addCase(getUserDetailsAdmin.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getUserDetailsAdmin.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    })
    .addCase(getUserDetailsAdmin.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

export const updateMentorFinalReducer = createReducer(
  initalState,
  (builder) => {
    builder

      .addCase(updateMentorFinalInfo.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateMentorFinalInfo.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
      })
      .addCase(updateMentorFinalInfo.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(updateMentorFinalInfoAfter.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateMentorFinalInfoAfter.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
      })
      .addCase(updateMentorFinalInfoAfter.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(clearMessage.fulfilled, (state, action) => {
        return {
          ...state,
          user: {},
        };
      })
      .addCase(clearError.fulfilled, (state, action) => {
        return {
          ...state,
          error: null,
        };
      });
  }
);
export const mentoringStatus = createReducer(
  initalState,
  (builder) => {
    builder

      .addCase(updateMentoringStatus.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateMentoringStatus.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
      })
      .addCase(updateMentoringStatus.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(clearMessage.fulfilled, (state, action) => {
        return {
          ...state,
          user: {},
        };
      })
      .addCase(clearError.fulfilled, (state, action) => {
        return {
          ...state,
          error: null,
        };
      });
  }
);
export const updateMentorPassword = createReducer(
  initalState,
  (builder) => {
    builder

      .addCase(updatePasswordMentor.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updatePasswordMentor.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          status:'success'
        };
      })
      .addCase(updatePasswordMentor.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(clearMessage.fulfilled, (state, action) => {
        return {
          ...state,
          status: {},
        };
      })
      .addCase(clearError.fulfilled, (state, action) => {
        return {
          ...state,
          error: null,
        };
      });
  }
);

export const updateMentor = createReducer(initalState, (builder) => {
  builder

    .addCase(updateMentorInfo.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(updateMentorInfo.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    })
    .addCase(updateMentorInfo.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearMessage.fulfilled, (state, action) => {
      return {
        ...state,
        user: {},
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const changeCoverReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(updateCoverImage.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(updateCoverImage.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    })
    .addCase(updateCoverImage.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: false,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

export const updateMentorRole = createReducer(initalState, (builder) => {
  builder

    .addCase(updateRoleMentor.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(updateRoleMentor.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        status: action.payload,
      };
    })
    .addCase(updateRoleMentor.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    })
    .addCase(clearMessage.fulfilled, (state, action) => {
      return {
        ...state,
        status: {},
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const popUpReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(popUpState.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(popUpState.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        status: action.payload.success,
      };
    })
    .addCase(popUpState.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload.message,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

// get all user (admin)
export const allStudentsReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(getAllStudents.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getAllStudents.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    })
    .addCase(getAllStudents.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
// get all mentors (admin)
export const allMentorReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(getAllMentors.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getAllMentors.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    })
    .addCase(getAllMentors.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
// get all admin (admin)
export const allAdminReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(getAllAdmin.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getAllAdmin.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    })
    .addCase(getAllAdmin.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

// delete user admin
export const deleteUserReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(deleteUser.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.sucess,
        message: action.payload.message,
      };
    })
    .addCase(deleteUser.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        isDeleted: false,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
// grant status admin
export const grantStatusHeadMentor = createReducer(initalState, (builder) => {
  builder

    .addCase(updateStatusHeadMentor.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(updateStatusHeadMentor.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        sucess: action.payload.success,
      };
    })
    .addCase(updateStatusHeadMentor.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        sucess: false,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

//change approval
export const assignConnectionReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(assignConnection.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(assignConnection.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    })
    .addCase(assignConnection.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: false,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const allConnectionReducerMentor = createReducer(
  initalState,
  (builder) => {
    builder

      .addCase(allMentorConnection.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(allMentorConnection.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          success: action.payload,
        };
      })
      .addCase(allMentorConnection.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(reset.fulfilled, (state, action) => {
        return {
          ...state,
          success: false,
        };
      })
      .addCase(clearError.fulfilled, (state, action) => {
        return {
          ...state,
          error: null,
        };
      });
  }
);
export const allConnectionReducerHead = createReducer(
  initalState,
  (builder) => {
    builder

      .addCase(allHeadConnection.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(allHeadConnection.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          connection: action.payload.connection,
        };
      })
      .addCase(allHeadConnection.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(clearError.fulfilled, (state, action) => {
        return {
          ...state,
          error: null,
        };
      });
  }
);
export const allMentorSelfCoonnection = createReducer(
  initalState,
  (builder) => {
    builder

      .addCase(allSelfConnection.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(allSelfConnection.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          connection: action.payload.connection,
        };
      })
      .addCase(allSelfConnection.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(clearError.fulfilled, (state, action) => {
        return {
          ...state,
          error: null,
        };
      });
  }
);
export const allMentorHead = createReducer(
  initalState,
  (builder) => {
    builder

      .addCase(allMentors.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(allMentors.fulfilled, (state, action) => {
        return {
          ...state,
          mentors:action.payload.allMentors,
          loading: false,
        };
      })
      .addCase(allMentors.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      })
      .addCase(clearError.fulfilled, (state, action) => {
        return {
          ...state,
          error: null,
        };
      });
  }
);
export const resoveConnectionReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(resolveConnection.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(resolveConnection.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    })
    .addCase(resolveConnection.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: false,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

export const sendOTPReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(sendOTP.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(sendOTP.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.status,
        message: action.payload.message,
        sent:true
      };
    })
    .addCase(sendOTP.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    // .addCase(stusendOTP.pending, (state, action) => {
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // })
    // .addCase(stusendOTP.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     loading: false,
    //     success: action.payload.status,
    //     message: action.payload.message,
    //     sent:true
    //   };
    // })
    // .addCase(stusendOTP.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload,
    //   };
    // })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: null,
        message: null,
      };
    })
    .addCase(otpReset.fulfilled, (state, action) => {
      return {
        ...state,
        sent:false
      };
    })

    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const stuSendOTPReducer = createReducer(initalState, (builder) => {
  builder

  .addCase(stusendOTP.pending, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  })
  .addCase(stusendOTP.fulfilled, (state, action) => {
    return {
      ...state,
      loading: false,
      success: action.payload.status,
      message: action.payload.message,
      sent:true
    };
  })
  .addCase(stusendOTP.rejected, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  })
  .addCase(reset.fulfilled, (state, action) => {
    return {
      ...state,
      success: null,
      message: null,
    };
  })
  .addCase(otpReset.fulfilled, (state, action) => {
    return {
      ...state,
      sent:false
    };
  })

  .addCase(clearError.fulfilled, (state, action) => {
    return {
      ...state,
      error: null,
    };
  });
});

//otp reducer for email and numb seperately
export const stuSendOTPnumbReducer = createReducer(initalState, (builder) => {
  builder

  .addCase(stusendOTPnumb.pending, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  })
  .addCase(stusendOTPnumb.fulfilled, (state, action) => {
    return {
      ...state,
      loading: false,
      success: action.payload.status,
      message: action.payload.message,
      sent: true
    };
  })
  .addCase(stusendOTPnumb.rejected, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  })
  .addCase(reset.fulfilled, (state, action) => {
    return {
      ...state,
      success: null,
      message: null,
    };
  })
  .addCase(otpReset.fulfilled, (state, action) => {
    return {
      ...state,
      sent: false
    };
  })

  .addCase(clearError.fulfilled, (state, action) => {
    return {
      ...state,
      error: null,
    };
  });
});

export const stuSendOTPemailReducer = createReducer(initalState, (builder) => {
  builder

  .addCase(stusendOTPemail.pending, (state, action) => {
    return {
      ...state,
      loading: true,
    };
  })
  .addCase(stusendOTPemail.fulfilled, (state, action) => {
    return {
      ...state,
      loading: false,
      success: action.payload.status,
      message: action.payload.message,
      sent: true
    };
  })
  .addCase(stusendOTPemail.rejected, (state, action) => {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  })
  .addCase(reset.fulfilled, (state, action) => {
    return {
      ...state,
      success: null,
      message: null,
    };
  })
  .addCase(otpReset.fulfilled, (state, action) => {
    return {
      ...state,
      sent: false
    };
  })

  .addCase(clearError.fulfilled, (state, action) => {
    return {
      ...state,
      error: null,
    };
  });
});

export const mentorSendOTPemailReducer = createReducer(initalState, (builder) => {
  builder

   .addCase(mentorSendOTPemail.pending, (state, action) => {
       return {
         ...state,
         loading: true,
       };
     })
     .addCase(mentorSendOTPemail.fulfilled, (state, action) => {
       return {
         ...state,
         loading: false,
         success: action.payload.status,
         message: action.payload.message,
         sent: true
       };
     })
     .addCase(mentorSendOTPemail.rejected, (state, action) => {
       return {
         ...state,
         loading: false,
         error: action.payload,
       };
     })
     .addCase(reset.fulfilled, (state, action) => {
       return {
         ...state,
         success: null,
         message: null,
       };
     })
     .addCase(otpReset.fulfilled, (state, action) => {
       return {
         ...state,
         sent: false
       };
     })
   
     .addCase(clearError.fulfilled, (state, action) => {
       return {
         ...state,
         error: null,
       };
     });
});

export const mentorSendOTPnumbReducer = createReducer(initalState, (builder) => {

  builder

   .addCase(mentorSendOTPnumb.pending, (state, action) => {
       return {
         ...state,
         loading: true,
       };
     })
     .addCase(mentorSendOTPnumb.fulfilled, (state, action) => {
       return {
         ...state,
         loading: false,
         success: action.payload.status,
         message: action.payload.message,
         sent: true
       };
     })
     .addCase(mentorSendOTPnumb.rejected, (state, action) => {
       return {
         ...state,
         loading: false,
         error: action.payload,
       };
     })
     .addCase(reset.fulfilled, (state, action) => {
       return {
         ...state,
         success: null,
         message: null,
       };
     })
     .addCase(otpReset.fulfilled, (state, action) => {
       return {
         ...state,
         sent: false
       };
     })
   
     .addCase(clearError.fulfilled, (state, action) => {
       return {
         ...state,
         error: null,
       };
     });
}); 




export const reSendOTPReducerStu = createReducer(initalState, (builder) => {
  builder

    .addCase(sturesendOTP.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(sturesendOTP.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.status,
        message: action.payload.message,
      };
    })
    .addCase(sturesendOTP.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: null,
        message: null,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const tkidReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(isTKid.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(isTKid.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    })
    .addCase(isTKid.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: null,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});

export const reSendOTPReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(resendOTP.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(resendOTP.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.status,
        message: action.payload.message,
      };
    })
    .addCase(resendOTP.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    // .addCase(sturesendOTP.pending, (state, action) => {
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // })
    // .addCase(sturesendOTP.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     loading: false,
    //     success: action.payload.status,
    //     message: action.payload.message,
    //   };
    // })
    // .addCase(sturesendOTP.rejected, (state, action) => {
    //   return {
    //     ...state,
    //     loading: false,
    //     error: action.payload.error,
    //   };
    // })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: null,
        message: null,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const verifyOTPReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(verifyOTP.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(verifyOTP.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.status,
        message: action.payload.message,
      };
    })
    .addCase(verifyOTP.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(stuVerifyOTP.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(stuVerifyOTP.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.status,
        message: action.payload.message,
      };
    })
    .addCase(stuVerifyOTP.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: null,
        message: null,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const resetPasswordReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(resetPassword.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(resetPassword.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.message,
        userId:action.payload.userId
      };
    })
    .addCase(resetPassword.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: null,
        message: null,
      };
    })
    .addCase(clearMessage.fulfilled, (state, action) => {
      return {
        ...state,
        message: null,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const getVisitReducer = createReducer(initalState, (builder) => {
  builder
    .addCase(getVisitsData.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getVisitsData.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        visits: action.payload,
      };
    })
    .addCase(getVisitsData.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const changePasswordReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(changePassword.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(changePassword.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
      };
    })
    .addCase(changePassword.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: null,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const addNewConnectionReducer = createReducer(initalState, (builder) => {
  builder

    .addCase(addNewConnection.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(addNewConnection.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        message: action.payload.message
      };
    })
    .addCase(addNewConnection.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: null,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const getConnectionByMob = createReducer(initalState, (builder) => {
  builder
    .addCase(findConnectionByMob.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(findConnectionByMob.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        activeConnection: action.payload.activeConnection,
        name: action.payload.name,
        stuId:action.payload.stuId
      };
    })
    .addCase(findConnectionByMob.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: null,
        activeConnection:null,
        name: null,
        stuId:null
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const getMentorByMob = createReducer(initalState, (builder) => {
  builder
    .addCase(findMentorByMob.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(findMentorByMob.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        mentor:action.payload.mentor
      };
    })
    .addCase(findMentorByMob.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: null,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const swapConnectionReducer = createReducer(initalState, (builder) => {
  builder
    .addCase(swapConnection.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(swapConnection.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        success:action.payload.success
      };
    })
    .addCase(swapConnection.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        success: null,
      };
    })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    });
});
export const chatMentor = createReducer(initalState, (builder) => {
  builder
    .addCase(getAllChats.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getAllChats.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        chats:action.payload.chats
      };
    })
    .addCase(getAllChatsStu.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getAllChatsStu.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        chats:action.payload.chats
      };
    })
    .addCase(getAllChatsStu.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(getAllChats.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    // .addCase(reset.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     success: null,
    //   };
    // })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        chats:null,
      };
    });
});

export const notificationUser = createReducer(initalState, (builder) => {
  builder
    .addCase(getAllNotification.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getAllNotification.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        notificatioin:action.payload.notification
      };
    })
    .addCase(getAllNotificationStu.pending, (state, action) => {
      return {
        ...state,
        loading: true,
      };
    })
    .addCase(getAllNotificationStu.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        notificatioin:action.payload.notification
      };
    })
    .addCase(getAllNotificationStu.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    .addCase(getAllNotification.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    })
    // .addCase(reset.fulfilled, (state, action) => {
    //   return {
    //     ...state,
    //     success: null,
    //   };
    // })
    .addCase(clearError.fulfilled, (state, action) => {
      return {
        ...state,
        error: null,
      };
    })
    .addCase(reset.fulfilled, (state, action) => {
      return {
        ...state,
        notificatioin:[],
      };
    });
});
// export const chatStudent = createReducer(initalState, (builder) => {
//   builder

//     // .addCase(reset.fulfilled, (state, action) => {
//     //   return {
//     //     ...state,
//     //     success: null,
//     //   };
//     // })
//     .addCase(clearError.fulfilled, (state, action) => {
//       return {
//         ...state,
//         error: null,
//       };
//     });
// });
