package com.marly.handmade.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ApacheCommonsUtilsTest {

    @Test
    void requerirNoNulo_conValor_noLanza() {
        ApacheCommonsUtils.requireNonNullRuntime("value", "should not be null");
    }

    @Test
    void requerirNoNulo_conNull_lanzaRuntimeException() {
        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> ApacheCommonsUtils.requireNonNullRuntime(null, "is null"));
        assertEquals("is null", ex.getMessage());
    }

    @Test
    void verificarArgumento_cuandoTrue_noLanza() {
        ApacheCommonsUtils.checkArgumentRuntime(2 > 1, "bad");
    }

    @Test
    void verificarArgumento_cuandoFalse_lanzaRuntimeException() {
        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> ApacheCommonsUtils.checkArgumentRuntime(false, "not true"));
        assertEquals("not true", ex.getMessage());
    }

    @Test
    void estaEnBlanco_y_defaultSiBlanco_comportamiento() {
        assertTrue(ApacheCommonsUtils.isBlank(null));
        assertTrue(ApacheCommonsUtils.isBlank("") );
        assertTrue(ApacheCommonsUtils.isBlank("   "));
        assertFalse(ApacheCommonsUtils.isBlank("x"));

        assertEquals("def", ApacheCommonsUtils.defaultIfBlank(null, "def"));
        assertEquals("def", ApacheCommonsUtils.defaultIfBlank("", "def"));
        assertEquals("val", ApacheCommonsUtils.defaultIfBlank("val", "def"));
    }
    @Test
    void requireNonNullRuntime_throwsOnNull() {
        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> ApacheCommonsUtils.requireNonNullRuntime(null, "msg"));
        assertTrue(ex.getMessage().contains("msg"));
    }

    @Test
    void checkArgumentRuntime_throwsOnFalse() {
        RuntimeException ex = assertThrows(RuntimeException.class,
                () -> ApacheCommonsUtils.checkArgumentRuntime(false, "bad"));
        assertTrue(ex.getMessage().contains("bad"));
    }

    @Test
    void isBlank_and_defaultIfBlank_behaveAsExpected() {
        assertTrue(ApacheCommonsUtils.isBlank(null));
        assertTrue(ApacheCommonsUtils.isBlank(""));
        assertTrue(ApacheCommonsUtils.isBlank("   \t\n"));
        assertFalse(ApacheCommonsUtils.isBlank("x"));

        assertEquals("def", ApacheCommonsUtils.defaultIfBlank(null, "def"));
        assertEquals("def", ApacheCommonsUtils.defaultIfBlank("", "def"));
        assertEquals("val", ApacheCommonsUtils.defaultIfBlank("val", "def"));
    }

}
