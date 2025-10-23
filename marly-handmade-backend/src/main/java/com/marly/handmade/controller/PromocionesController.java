package com.marly.handmade.controller;

import java.net.URI;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import com.marly.handmade.domain.promociones.data.PromocionesRequest;
import com.marly.handmade.domain.promociones.data.PromocionesResponse;
import com.marly.handmade.service.PromocionesService;

import jakarta.validation.Valid;



@RestController
@RequestMapping("promociones")
public class PromocionesController {

    private PromocionesService promocionesService;

    public PromocionesController(PromocionesService promocionesService) {
        this.promocionesService = promocionesService;
    }

    @PostMapping
    public ResponseEntity<PromocionesResponse> crearPromociones (@RequestBody @Valid PromocionesRequest promocionesRequest,UriComponentsBuilder builder){
        PromocionesResponse promocionesResponse = promocionesService.crearPromociones(promocionesRequest);
        URI uri = builder.path("/promociones/{id}").buildAndExpand(promocionesResponse.id()).toUri();
        return ResponseEntity.created(uri).body(promocionesResponse);
    }

}
