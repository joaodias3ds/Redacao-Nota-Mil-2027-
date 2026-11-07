package com.example.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.navigationBarsPadding
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.testTag
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.ui.theme.BorderLight
import com.example.ui.theme.PinkLight
import com.example.ui.theme.PinkPrimary
import com.example.ui.theme.PinkPrimaryDark
import com.example.ui.theme.TextPrimary
import com.example.ui.theme.TextSecondary

@Composable
fun OnboardingScreen(
  onNext: () -> Unit,
  onSkip: () -> Unit
) {
  Box(
    modifier = Modifier
      .fillMaxSize()
      .background(Color.White)
  ) {
    // Top Half: Deep Magenta Gradient with Stacked Cards Illustration
    Box(
      modifier = Modifier
        .fillMaxWidth()
        .height(440.dp)
        .background(
          brush = Brush.verticalGradient(
            colors = listOf(
              Color(0xFF8E003D),
              PinkPrimary,
              Color(0xFF9E0043)
            )
          )
        )
        .statusBarsPadding()
    ) {
      // Header brand
      Text(
        text = "App Redação",
        color = Color.White,
        fontSize = 19.sp,
        fontWeight = FontWeight.Bold,
        modifier = Modifier
          .padding(start = 24.dp, top = 20.dp)
          .testTag("onboarding_title_app")
      )

      // Stacked Cards Mockup Illustration
      Box(
        modifier = Modifier
          .fillMaxSize()
          .padding(bottom = 20.dp),
        contentAlignment = Alignment.Center
      ) {
        // Back tilt card (light pink)
        Surface(
          modifier = Modifier
            .size(width = 230.dp, height = 270.dp)
            .offset(x = (-20).dp, y = 14.dp)
            .rotate(-8f),
          shape = RoundedCornerShape(24.dp),
          color = Color(0xFFF472B6).copy(alpha = 0.5f),
          shadowElevation = 4.dp
        ) {}

        // Middle tilt card (magenta tone)
        Surface(
          modifier = Modifier
            .size(width = 226.dp, height = 270.dp)
            .offset(x = (-8).dp, y = 6.dp)
            .rotate(-4f),
          shape = RoundedCornerShape(24.dp),
          color = Color(0xFFE11D48).copy(alpha = 0.8f),
          shadowElevation = 8.dp
        ) {}

        // Front Main White Card with Citação · C2 mockup
        Surface(
          modifier = Modifier
            .size(width = 224.dp, height = 270.dp),
          shape = RoundedCornerShape(24.dp),
          color = Color.White,
          shadowElevation = 16.dp
        ) {
          Column(
            modifier = Modifier
              .fillMaxSize()
              .padding(20.dp),
            verticalArrangement = Arrangement.SpaceBetween
          ) {
            Column {
              // Pill badge
              Box(
                modifier = Modifier
                  .clip(RoundedCornerShape(12.dp))
                  .background(PinkLight)
                  .padding(horizontal = 10.dp, vertical = 4.dp)
              ) {
                Text(
                  text = "CITAÇÃO · C2",
                  color = PinkPrimary,
                  fontSize = 11.sp,
                  fontWeight = FontWeight.Bold,
                  letterSpacing = 0.5.sp
                )
              }

              Spacer(modifier = Modifier.height(18.dp))

              // Simulated essay text lines
              Box(
                modifier = Modifier
                  .fillMaxWidth(0.9f)
                  .height(12.dp)
                  .clip(RoundedCornerShape(6.dp))
                  .background(Color(0xFF1E1E24))
              )
              Spacer(modifier = Modifier.height(10.dp))
              Box(
                modifier = Modifier
                  .fillMaxWidth()
                  .height(12.dp)
                  .clip(RoundedCornerShape(6.dp))
                  .background(Color(0xFF1E1E24))
              )
              Spacer(modifier = Modifier.height(10.dp))
              Box(
                modifier = Modifier
                  .fillMaxWidth(0.6f)
                  .height(12.dp)
                  .clip(RoundedCornerShape(6.dp))
                  .background(Color(0xFF1E1E24))
              )
            }

            // Bottom dots
            Row(
              horizontalArrangement = Arrangement.spacedBy(8.dp),
              verticalAlignment = Alignment.CenterVertically
            ) {
              Box(
                modifier = Modifier
                  .size(28.dp)
                  .clip(CircleShape)
                  .background(PinkPrimary)
              )
              Box(
                modifier = Modifier
                  .size(28.dp)
                  .clip(CircleShape)
                  .background(Color(0xFFE5E7EB))
              )
              Box(
                modifier = Modifier
                  .size(28.dp)
                  .clip(CircleShape)
                  .background(Color(0xFFE5E7EB))
              )
            }
          }
        }
      }
    }

    // Bottom White Container with Headline and Actions
    Surface(
      modifier = Modifier
        .fillMaxWidth()
        .align(Alignment.BottomCenter),
      shape = RoundedCornerShape(topStart = 32.dp, topEnd = 32.dp),
      color = Color.White
    ) {
      Column(
        modifier = Modifier
          .fillMaxWidth()
          .padding(horizontal = 24.dp)
          .padding(top = 28.dp, bottom = 24.dp)
          .navigationBarsPadding(),
        horizontalAlignment = Alignment.Start
      ) {
        // Page indicator (pink pill + gray dot)
        Row(
          verticalAlignment = Alignment.CenterVertically,
          horizontalArrangement = Arrangement.spacedBy(6.dp)
        ) {
          Box(
            modifier = Modifier
              .width(28.dp)
              .height(5.dp)
              .clip(RoundedCornerShape(3.dp))
              .background(PinkPrimary)
          )
          Box(
            modifier = Modifier
              .size(5.dp)
              .clip(CircleShape)
              .background(Color(0xFFD1D5DB))
          )
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Headline
        Text(
          text = "Escreva. Receba\nretorno. Evolua.",
          color = TextPrimary,
          fontSize = 28.sp,
          lineHeight = 34.sp,
          fontWeight = FontWeight.Bold
        )

        Spacer(modifier = Modifier.height(12.dp))

        // Subtitle
        Text(
          text = "Envie sua redação, acompanhe a correção e veja sua evolução em cada competência.",
          color = TextSecondary,
          fontSize = 15.sp,
          lineHeight = 22.sp
        )

        Spacer(modifier = Modifier.height(32.dp))

        // "Próximo" Button
        Button(
          onClick = onNext,
          modifier = Modifier
            .fillMaxWidth()
            .height(54.dp)
            .testTag("onboarding_btn_next"),
          shape = RoundedCornerShape(27.dp),
          colors = ButtonDefaults.buttonColors(
            containerColor = PinkPrimary,
            contentColor = Color.White
          ),
          elevation = ButtonDefaults.buttonElevation(defaultElevation = 2.dp)
        ) {
          Text(
            text = "Próximo",
            fontSize = 16.sp,
            fontWeight = FontWeight.SemiBold
          )
        }

        Spacer(modifier = Modifier.height(10.dp))

        // "Pular" Text button
        Box(
          modifier = Modifier.fillMaxWidth(),
          contentAlignment = Alignment.Center
        ) {
          TextButton(
            onClick = onSkip,
            modifier = Modifier.testTag("onboarding_btn_skip")
          ) {
            Text(
              text = "Pular",
              color = TextSecondary,
              fontSize = 14.sp,
              fontWeight = FontWeight.Medium
            )
          }
        }
      }
    }
  }
}
