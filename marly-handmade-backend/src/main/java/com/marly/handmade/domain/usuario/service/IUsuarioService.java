package com.marly.handmade.domain.usuario.service;

import com.marly.handmade.domain.cliente.data.request.ForgetPassword;
import com.marly.handmade.domain.cliente.data.request.ResetPasswordRequest;
import com.marly.handmade.domain.cliente.data.response.RespuestaForgotPassword;
import com.marly.handmade.domain.usuario.data.request.RegistrarUsuario;
import com.marly.handmade.domain.usuario.data.responst.RespuestaRegistro;

import jakarta.validation.Valid;

public interface IUsuarioService {
    RespuestaRegistro registrar(RegistrarUsuario registrarUsuario);
    RespuestaForgotPassword forgotPassword(@Valid ForgetPassword forgetPassword) throws Exception;
    RespuestaForgotPassword updatePassword(ResetPasswordRequest resetPasswordRequest);
}
