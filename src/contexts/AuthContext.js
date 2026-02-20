import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';

const UserPoolId = process.env.REACT_APP_USER_POOL_ID;
const ClientId = process.env.REACT_APP_CLIENT_ID;

const poolData = {
  UserPoolId,
  ClientId,
};

const userPool = new CognitoUserPool(poolData);

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const cognitoUser = userPool.getCurrentUser();
      if (cognitoUser) {
        cognitoUser.getSession((err, session) => {
          if (err) {
            setUser(null);
            setLoading(false);
            return;
          }
          if (session.isValid()) {
            cognitoUser.getUserAttributes((err, attributes) => {
              if (!err) {
                const userData = attributes.reduce((acc, attr) => {
                  acc[attr.Name] = attr.Value;
                  return acc;
                }, {});
                setUser({ ...userData, username: cognitoUser.getUsername() });
              }
              setLoading(false);
            });
          } else {
            setUser(null);
            setLoading(false);
          }
        });
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  const setUserRole = (role) => {
    localStorage.setItem('userRole', role);
  };

  const getUserRole = () => {
    return localStorage.getItem('userRole');
  };

  const signUp = (email, password, name) => {
    return new Promise((resolve, reject) => {
      const attributeList = [
        new CognitoUserAttribute({ Name: 'email', Value: email }),
        new CognitoUserAttribute({ Name: 'name', Value: name }),
      ];

      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          setError(err.message);
          reject(err);
          return;
        }
        resolve(result.user);
      });
    });
  };

  const confirmSignUp = (email, code) => {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) {
          setError(err.message);
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  };

  const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      });

      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (session) => {
          cognitoUser.getUserAttributes((err, attributes) => {
            if (!err) {
              const userData = attributes.reduce((acc, attr) => {
                acc[attr.Name] = attr.Value;
                return acc;
              }, {});
              setUser({ ...userData, username: cognitoUser.getUsername() });
            }
            resolve(session);
          });
        },
        onFailure: (err) => {
          setError(err.message);
          reject(err);
        },
      });
    });
  };

  const signOut = () => {
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser) {
      cognitoUser.signOut();
      setUser(null);
      localStorage.removeItem('userRole');
    }
  };

  const forgotPassword = (email) => {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.forgotPassword({
        onSuccess: (data) => resolve(data),
        onFailure: (err) => {
          setError(err.message);
          reject(err);
        },
      });
    });
  };

  const confirmPassword = (email, code, newPassword) => {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.confirmPassword(code, newPassword, {
        onSuccess: () => resolve(),
        onFailure: (err) => {
          setError(err.message);
          reject(err);
        },
      });
    });
  };

  const resendConfirmationCode = (email) => {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      });

      cognitoUser.resendConfirmationCode((err, result) => {
        if (err) {
          setError(err.message);
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  };

  const getAccessToken = () => {
    return new Promise((resolve, reject) => {
      const cognitoUser = userPool.getCurrentUser();
      if (!cognitoUser) {
        reject(new Error('No user found'));
        return;
      }

      cognitoUser.getSession((err, session) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(session.getAccessToken().getJwtToken());
      });
    });
  };

  const value = {
    user,
    loading,
    error,
    signUp,
    confirmSignUp,
    signIn,
    signOut,
    forgotPassword,
    confirmPassword,
    resendConfirmationCode,
    getAccessToken,
    setError,
    setUserRole,
    getUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
